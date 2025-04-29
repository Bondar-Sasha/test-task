import { Global, Module } from '@nestjs/common'
import { resolve } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { validate } from './env/env.validation'
import { EnvService } from './env/env.service'

@Global()
@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: resolve(process.cwd(), '../../.env'),
         validate,
      }),
   ],
   providers: [ConfigService, EnvService],
   exports: [ConfigService, EnvService],
})
export class CfgModule {}
