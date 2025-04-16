import { Global, Module } from '@nestjs/common'
import { resolve } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { validate } from './env/env.validation'
import { EnvService } from './env/env.service'
import { AppRoutesModule } from './app-routes/app-routes.module';

@Global()
@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: resolve(process.cwd(), '../../.env'),
         validate,
      }),
      AppRoutesModule,
   ],
   providers: [ConfigService, EnvService],
   exports: [ConfigService, EnvService],
})
export class CfgModule {}
