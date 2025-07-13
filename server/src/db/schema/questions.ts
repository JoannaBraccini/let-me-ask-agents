import { pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const questions = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id, { onDelete: "cascade" })
    .notNull(),
  question: text().notNull(),
  answer: text(),
  embeddings: vector({ dimensions: 768 }),
  createdAt: timestamp().defaultNow().notNull(),
});
