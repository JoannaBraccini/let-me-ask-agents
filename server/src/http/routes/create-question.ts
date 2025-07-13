import { and, eq, sql } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { generateAnswer, generateEmbeddings } from "../../services/gemini.ts";

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const { question } = request.body;

      const embeddings = await generateEmbeddings(question);

      const embeddingsAsString = `[${embeddings.join(",")}]`;

      let answer: string | null = null;
      let suggestedRooms: Array<{ roomId: string; roomName: string }> = [];

      // ETAPA 1: Buscar nos chunks de áudio da sala atual
      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.75`
          )
        )
        .orderBy(
          sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
        )
        .limit(3);

      if (chunks.length > 0) {
        // Encontrou chunks relevantes na sala atual
        const transcriptions = chunks.map((chunk) => chunk.transcription);
        answer = await generateAnswer(question, transcriptions);
      } else {
        // ETAPA 2: Buscar nos chunks de outras salas
        const chunksInOtherRooms = await db
          .select({
            id: schema.audioChunks.id,
            transcription: schema.audioChunks.transcription,
            roomId: schema.audioChunks.roomId,
            roomName: schema.rooms.name,
            similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
          })
          .from(schema.audioChunks)
          .leftJoin(
            schema.rooms,
            eq(schema.audioChunks.roomId, schema.rooms.id)
          )
          .where(
            and(
              sql`${schema.audioChunks.roomId} != ${roomId}`,
              sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.75`
            )
          )
          .orderBy(
            sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
          )
          .limit(3);

        if (chunksInOtherRooms.length > 0) {
          // Encontrou chunks em outras salas - gerar resposta
          const transcriptions = chunksInOtherRooms.map(
            (chunk) => chunk.transcription
          );
          answer = await generateAnswer(question, transcriptions);

          // Adicionar sugestões de salas relevantes
          const uniqueRooms = chunksInOtherRooms.reduce((acc, chunk) => {
            if (
              chunk.roomId &&
              chunk.roomName &&
              !acc.find((r) => r.roomId === chunk.roomId)
            ) {
              acc.push({
                roomId: chunk.roomId,
                roomName: chunk.roomName,
              });
            }
            return acc;
          }, [] as Array<{ roomId: string; roomName: string }>);

          suggestedRooms = uniqueRooms;
        } else {
          // ETAPA 3: Buscar em respostas já existentes (fallback)
          const existingQuestions = await db
            .select({
              question: schema.questions.question,
              answer: schema.questions.answer,
              roomId: schema.questions.roomId,
              roomName: schema.rooms.name,
              similarity: sql<number>`1 - (${schema.questions.embeddings} <=> ${embeddingsAsString}::vector)`,
            })
            .from(schema.questions)
            .leftJoin(
              schema.rooms,
              eq(schema.questions.roomId, schema.rooms.id)
            )
            .where(
              and(
                sql`${schema.questions.answer} IS NOT NULL`,
                sql`${schema.questions.answer} NOT ILIKE '%não possuo informações%'`,
                sql`${schema.questions.answer} NOT ILIKE '%não possui informações%'`,
                sql`${schema.questions.answer} NOT ILIKE '%informações suficientes%'`,
                sql`1 - (${schema.questions.embeddings} <=> ${embeddingsAsString}::vector) > 0.8`
              )
            )
            .orderBy(
              sql`${schema.questions.embeddings} <=> ${embeddingsAsString}::vector`
            )
            .limit(1);

          if (existingQuestions.length > 0) {
            // Encontrou pergunta similar já respondida
            answer = existingQuestions[0].answer;

            // Se a resposta veio de outra sala, sugerir navegação
            if (
              existingQuestions[0].roomId !== roomId &&
              existingQuestions[0].roomName
            ) {
              suggestedRooms = [
                {
                  roomId: existingQuestions[0].roomId,
                  roomName: existingQuestions[0].roomName,
                },
              ];
            }
          }
        }
      }

      // Salvar a pergunta no banco com embeddings
      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
          answer,
          embeddings: sql`${embeddingsAsString}::vector`,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error("Failed to create new room.");
      }

      return reply.status(201).send({
        questionId: insertedQuestion.id,
        answer,
        suggestedRooms: suggestedRooms.length > 0 ? suggestedRooms : undefined,
      });
    }
  );
};
