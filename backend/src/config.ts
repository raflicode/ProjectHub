import 'dotenv/config'
import { z } from 'zod'

const environmentSchema = z.object({
  DATABASE_URL: z.string().min(1).default('./data/project-hub.db'),
  HOST: z.string().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
})

export const env = environmentSchema.parse(process.env)