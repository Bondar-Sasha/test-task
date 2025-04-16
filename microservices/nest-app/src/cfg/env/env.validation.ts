import { plainToInstance } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, validateSync } from 'class-validator'

import { AppMode } from './env.service'

class EnvironmentVariables {
   @IsOptional()
   @IsString()
   CLIENT_URL: string

   @IsOptional()
   @IsString()
   JWT_SECRET: string

   @IsString()
   @IsIn(['development', 'production'])
   APP_MODE: AppMode

   @IsNumber()
   NEST_APP_PORT: number

   @IsString()
   POSTGRES_USER: string

   @IsString()
   POSTGRES_PASSWORD: string

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
   MONGO_HOST: string

   @IsNumber()
   MONGO_PORT: number

   @IsNotEmpty()
   EMAIL_HOST: string

   @IsNumber()
   EMAIL_PORT: number

   @IsNotEmpty()
   EMAIL_USER: string

   @IsNotEmpty()
   EMAIL_PASSWORD: string
}

export function validate(config: Record<string, unknown>) {
   const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
   })
   const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
   })

   if (errors.length) {
      throw Error(errors.toString())
   }
   return validatedConfig
}
