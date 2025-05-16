import { z } from 'zod'
import { resolve } from 'node:path'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

const APP_MODE = process.env.APP_MODE

if (!APP_MODE) {
   throw new Error('APP_MODE is not defined')
}

expand(
   config({
      path: resolve(process.cwd(), APP_MODE === 'production' ? '../../.env.production' : '../../.env.development'),
   }),
)

const requiredString = z.string().min(1)

const envSchema = z
   .object({
      EXPRESS_APP_PORT: z.coerce.number().positive(),
      APP_MODE: z.enum(['development', 'production']),
      CLIENT_URL: requiredString,

      JWT_SECRET: requiredString,
      ACCESS_TOKEN_EXPIRES_IN: requiredString,
      REFRESH_TOKEN_EXPIRES_IN: requiredString,

      AUTH_POSTGRES_DB_URL: requiredString,
      REDIS_AUTH_DB_URL: requiredString,

      EMAIL_HOST: requiredString,
      EMAIL_PORT: z.coerce.number().positive(),
      EMAIL_USER: requiredString,
      EMAIL_PASSWORD: requiredString,

      GOOGLE_CLIENT_ID: requiredString,
      GOOGLE_CLIENT_SECRET: requiredString,
      GOOGLE_CALLBACK_URL: requiredString,

      GITHUB_CLIENT_ID: requiredString,
      GITHUB_CLIENT_SECRET: requiredString,
      GITHUB_CALLBACK_URL: requiredString,
   })
   .passthrough()

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
   throw new Error(`Config validation error: ${JSON.stringify(parsed.error.format())}`)
}

export default parsed.data
