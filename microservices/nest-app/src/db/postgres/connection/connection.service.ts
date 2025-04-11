import { Injectable, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { EnvService } from '../../../cfg'

@Injectable()
export class ConnectionService implements OnModuleDestroy, OnModuleInit {
   private postgresClient: DataSource

   constructor(private readonly envService: EnvService) {}

   async onModuleInit() {
      if (this.postgresClient.isInitialized) {
         return
      }
      const APP_MODE = this.envService.getAppMode()

      const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } =
         this.envService.getPostgresCredentials()

      this.postgresClient = new DataSource({
         type: 'postgres',
         host: POSTGRES_HOST,
         port: POSTGRES_PORT,
         username: POSTGRES_USER,
         password: POSTGRES_PASSWORD,
         database: POSTGRES_DB,
         synchronize: APP_MODE === 'development',
         logging: APP_MODE === 'development',
      })

      try {
         await this.postgresClient.initialize()
         console.log('nest -> postgres')
      } catch (error) {
         throw new InternalServerErrorException(error, 'error in postgres connection')
      }
   }

   async onModuleDestroy() {
      try {
         await this.postgresClient.destroy()
      } catch (error) {
         throw new InternalServerErrorException(error, 'error in postgres disconnection')
      }
   }

   getClient(): DataSource {
      return this.postgresClient
   }
}
