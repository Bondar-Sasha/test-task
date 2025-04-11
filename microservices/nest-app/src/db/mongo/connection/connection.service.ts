import { Injectable, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { EnvService } from '../../../cfg'

@Injectable()
export class ConnectionService implements OnModuleInit, OnModuleDestroy {
   private mongoClient: DataSource

   constructor(private readonly envService: EnvService) {}

   async onModuleInit() {
      if (this.mongoClient.isInitialized) {
         return
      }
      const APP_MODE = this.envService.getAppMode()

      const { MONGO_HOST, MONGO_PORT, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } =
         this.envService.getMongoCredentials()

      this.mongoClient = new DataSource({
         type: 'mongodb',
         url: `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}?authSource=admin`,
         synchronize: APP_MODE === 'development',
      })

      try {
         await this.mongoClient.initialize()
         console.log('nest -> postgres')
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
