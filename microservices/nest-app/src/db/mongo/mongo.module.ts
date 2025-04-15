import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EnvService } from '@cfg'
import { ConnectionService } from './connection/connection.service'

@Module({
   imports: [
      MongooseModule.forRootAsync({
         inject: [EnvService],
         useFactory: (envService: EnvService) => {
            const {
               MONGO_HOST,
               MONGO_PORT,
               MONGO_INITDB_ROOT_USERNAME,
               MONGO_INITDB_ROOT_PASSWORD,
               MONGO_INITDB_DATABASE,
            } = envService.getMongoCredentials()

            const uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}?authSource=admin`

            return {
               uri,
               autoIndex: envService.getAppMode() === 'development',
               retryAttempts: 5,
               retryDelay: 1000,
            }
         },
      }),
   ],
   providers: [ConnectionService],
   exports: [ConnectionService],
})
export class MongoModule {}
