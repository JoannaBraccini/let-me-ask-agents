import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z
    .string()
    .url()
    .startsWith("postgresql://")
    .default("postgresql://"),
  GEMINI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
