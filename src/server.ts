/** biome-ignore-all assist/source/organizeImports: manual import organization */
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { sql } from './db/connection.ts'
import { env } from './env.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return { status: 'ok' }
})

app.listen({ port: env.PORT })
