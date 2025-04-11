import { Injectable, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { EnvService } from '../../../cfg'

@Injectable()
export class ConnectionService implements OnModuleInit, OnModuleDestroy {
   private mongoClient: DataSource

   constructor(private readonly envService: EnvService) {}

   async onModuleInit() {
      const APP_MODE = this.envService.getAppMode()

      const { MONGO_HOST, MONGO_PORT, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE } =
         this.envService.getMongoCredentials()

      this.mongoClient = new DataSource({
         type: 'mongodb',
         url: `mongodb://${MONGO_HOST}:${MONGO_PORT}`,
         authSource: 'admin',
         username: MONGO_INITDB_ROOT_USERNAME,
         password: MONGO_INITDB_ROOT_PASSWORD,
         database: MONGO_INITDB_DATABASE,
         synchronize: APP_MODE === 'development',
      })

      try {
         await this.mongoClient.initialize()
         console.log('nest -> mongo')
      } catch (error) {
         throw new InternalServerErrorException(error, 'error in mongoDb connection')
      }
   }

   async onModuleDestroy() {
      try {
         await this.mongoClient.destroy()
      } catch (error) {
         throw new InternalServerErrorException(error, 'error in mongoDb disconnection')
      }
   }

   getClient(): DataSource {
      return this.mongoClient
   }
}
