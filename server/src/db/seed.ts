import { seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await db.delete(schema.rooms)

await seed(db, { rooms: schema.rooms, questions: schema.questions }).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum({ sentencesCount: 2 }),
      },
    },
    questions: {
      count: 20,
      columns: {
        question: f.loremIpsum({ sentencesCount: 1 }),
        answer: f.loremIpsum({ sentencesCount: 3 }),
      },
    },
  }
})

await sql.end()
// biome-ignore lint/suspicious/noConsole: only used in development
console.log('Database seeded with proper content')
