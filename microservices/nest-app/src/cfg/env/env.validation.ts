import { plainToInstance } from 'class-transformer'
import { IsIn, IsNumber, IsString, validateSync } from 'class-validator'

import { AppEnvs } from '@test_task/types'
import { NotFoundException } from '@nestjs/common'

class EnvironmentVariables implements AppEnvs {
   @IsString()
   CLIENT_URL: string

   @IsString()
   SESSION_SECRET: string

   @IsString()
   JWT_SECRET: string

   @IsString()
   @IsIn(['development', 'production'] satisfies Array<AppEnvs['APP_MODE']>)
   APP_MODE: AppEnvs['APP_MODE']

   @IsNumber()
   NEST_APP_PORT: number
   @IsNumber()
   EXPRESS_APP_PORT: number

   @IsString()
   POSTGRES_USER: string
   @IsString()
   POSTGRES_PASSWORD: string
   @IsString()
   POSTGRES_HOST_AUTH_METHOD: string
   @IsString()
   POSTGRES_DB: string
   @IsString()
   POSTGRES_HOST: string
   @IsNumber()
   POSTGRES_PORT: number

   @IsString()
   REDIS_HOST: string
   @IsString()
   REDIS_USERNAME: string
   @IsNumber()
   REDIS_PORT: number
   @IsString()
   REDIS_PASSWORD: string
   @IsNumber()
   REDIS_AUTH_DB: number

   @IsString()
   MONGO_INITDB_ROOT_USERNAME: string
   @IsString()
   MONGO_INITDB_ROOT_PASSWORD: string
   @IsString()
   MONGO_INITDB_DATABASE: string
   @IsString()
   MONGO_LOG_LEVEL: string
   @IsString()
   MONGO_HOST: string
   @IsNumber()
   MONGO_PORT: number

   @IsString()
   EMAIL_HOST: string
   @IsNumber()
   EMAIL_PORT: number
   @IsString()
   EMAIL_USER: string
   @IsString()
   EMAIL_PASSWORD: string

   @IsString()
   GOOGLE_CLIENT_ID: string
   @IsString()
   GOOGLE_CLIENT_SECRET: string
   @IsString()
   GOOGLE_CALLBACK_URL: string

   @IsString()
   GITHUB_CLIENT_ID: string
   @IsString()
   GITHUB_CLIENT_SECRET: string
   @IsString()
   GITHUB_CALLBACK_URL: string
}

export function validate(config: AppEnvs): EnvironmentVariables {
   const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
   })

   const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
   })

   if (errors.length > 0) {
      const errorMessages = errors.map(err => Object.values(err.constraints || {}).join(', ')).join('; ')
      throw new NotFoundException(errorMessages)
   }

   return validatedConfig
}
