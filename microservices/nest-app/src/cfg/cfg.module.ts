import { Global, Module } from '@nestjs/common'
import { resolve } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { validate } from './env/env.validation'

const APP_MODE = process.env.APP_MODE

if (!APP_MODE) {
   throw new Error('APP_MODE is not defined')
}

@Global()
@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: resolve(
            process.cwd(),
            APP_MODE === 'production' ? '../../.env.production' : '../../.env.development',
         ),
         expandVariables: true,
         validate,
      }),
   ],
   providers: [ConfigService],
   exports: [ConfigService],
})
export class CfgModule {}
