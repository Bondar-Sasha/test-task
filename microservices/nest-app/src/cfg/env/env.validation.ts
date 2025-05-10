import { plainToInstance } from 'class-transformer'
import { IsIn, IsNumber, IsString, validateSync } from 'class-validator'

import { AppEnvs } from '@test_task/shared/types'
import { NotFoundException } from '@nestjs/common'

class EnvironmentVariables {
   @IsString()
   CLIENT_URL: string

   @IsString()
   JWT_SECRET: string

   @IsString()
   @IsIn(['development', 'production'])
   APP_MODE: AppEnvs['APP_MODE']

   @IsNumber()
   NEST_APP_PORT: number
   @IsNumber()
   EXPRESS_APP_PORT: number

   @IsString()
   COMMON_POSTGRES_DB_URL: string

   @IsString()
   MONGO_DB_URL: string

   @IsString()
   EMAIL_HOST: string
   @IsNumber()
   EMAIL_PORT: number
   @IsString()
   EMAIL_USER: string
   @IsString()
   EMAIL_PASSWORD: string
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
