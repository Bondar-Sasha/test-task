import { Injectable, OnModuleDestroy, InternalServerErrorException, OnModuleInit } from '@nestjs/common'
import { Redis } from 'ioredis'

import { EnvService } from '../../../cfg'

@Injectable()
export class ConnectionService implements OnModuleInit, OnModuleDestroy {
   private redisClient: Redis

   constructor(private readonly envService: EnvService) {}

   onModuleInit() {
      try {
         const { REDIS_USER, REDIS_PASSWORD, REDIS_PORT, REDIS_HOST, REDIS_DB_NUM } =
            this.envService.getRedisCredentials()

         this.redisClient = new Redis({
            host: REDIS_HOST,
            port: REDIS_PORT,
            username: REDIS_USER,
            password: REDIS_PASSWORD,
            db: REDIS_DB_NUM,
         })

         console.log('nest -> redis')
      } catch (error) {
         throw new InternalServerErrorException(error, 'error in redis connection')
      }
   }

   async onModuleDestroy() {
      try {
         await this.redisClient.quit()
      } catch (error) {
         throw new InternalServerErrorException(error, 'error in redis disconnection')
      }
   }

   getClient() {
      return this.redisClient
   }
}
