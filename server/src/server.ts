/** biome-ignore-all assist/source/organizeImports: manual import organization */
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { env } from '../env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestions } from './http/routes/get-room-questions.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'

const app = fastify({
  logger: false,
}).withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return { status: 'ok' }
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)

app.listen({ port: env.PORT }, () => {
  process.stdout.write(`🚀 Server rodando na porta ${env.PORT}!\n`)
})
