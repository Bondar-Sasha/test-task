import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ConfigService } from '@nestjs/config'

@Module({
   imports: [
      MongooseModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (cfgService: ConfigService) => {
            return {
               uri: cfgService.get('MONGO_DB_URL'),
               autoIndex: cfgService.get('APP_MODE') === 'development',
            }
         },
      }),
   ],
})
export class MongoModule {}
