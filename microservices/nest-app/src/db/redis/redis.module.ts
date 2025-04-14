import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ConnectionService } from './connection/connection.service'
import { EnvService } from '@cfg'

@Module({
   imports: [
      ClientsModule.registerAsync([
         {
            name: 'REDIS_SERVICE',
            useFactory: (envService: EnvService) => {
               const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD, REDIS_DB_NUM } =
                  envService.getRedisCredentials()

               return {
                  transport: Transport.REDIS,
                  options: {
                     host: REDIS_HOST,
                     port: Number(REDIS_PORT),
                     username: REDIS_USERNAME,
                     password: REDIS_PASSWORD,
                     db: Number(REDIS_DB_NUM),
                  },
               }
            },
            inject: [EnvService],
         },
      ]),
   ],
   providers: [ConnectionService],
   exports: [ClientsModule],
})
export class RedisModule {}
