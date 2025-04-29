import Joi from 'joi'
import { resolve } from 'node:path'
import { config } from 'dotenv'
config({ path: resolve(process.cwd(), '../../.env') })

import { AppEnvs } from '@test_task/shared/types'

const envSchema: Joi.ObjectSchema<AppEnvs> = Joi.object({
   CLIENT_URL: Joi.string().required(),
   JWT_SECRET: Joi.string().required(),
   EXPRESS_APP_PORT: Joi.number().required(),
   APP_MODE: Joi.string().valid('development', 'production').required(),
   POSTGRES_USER: Joi.string().required(),
   POSTGRES_PASSWORD: Joi.string().required(),
   POSTGRES_DB: Joi.string().required(),
   POSTGRES_HOST: Joi.string().required(),
   POSTGRES_PORT: Joi.number().required(),
   REDIS_USERNAME: Joi.string().required(),
   REDIS_PASSWORD: Joi.string().required(),
   REDIS_HOST: Joi.string().required(),
   REDIS_PORT: Joi.number().required(),
   REDIS_AUTH_DB: Joi.number().required(),
   EMAIL_HOST: Joi.string().required(),
   EMAIL_PORT: Joi.number().required(),
   EMAIL_USER: Joi.string().required(),
   EMAIL_PASSWORD: Joi.string().required(),
   GOOGLE_CLIENT_ID: Joi.string().required(),
   GOOGLE_CLIENT_SECRET: Joi.string().required(),
   GOOGLE_CALLBACK_URL: Joi.string().required(),
   GITHUB_CLIENT_ID: Joi.string().required(),
   GITHUB_CLIENT_SECRET: Joi.string().required(),
   GITHUB_CALLBACK_URL: Joi.string().required(),
})
   .unknown(true)
   .required()

const { error, value } = envSchema.validate(process.env)

if (error) {
   throw new Error(`Config validation error: ${error.message}`)
}

export default value satisfies AppEnvs
