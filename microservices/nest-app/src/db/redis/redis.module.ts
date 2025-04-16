import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { EnvService } from '@cfg'

@Module({
   imports: [
      ClientsModule.registerAsync([
         {
            name: 'REDIS_AUTH_SERVICE',
            useFactory: (envService: EnvService) => {
               const { REDIS_AUTH_DB } = envService.getRedisCredentials()
               return {
                  options: {
                     db: REDIS_AUTH_DB,
                     ttl: 180,
                  },
               }
            },
            inject: [EnvService],
         },
      ]),
   ],
   exports: [ClientsModule],
})
export class RedisModule {}
