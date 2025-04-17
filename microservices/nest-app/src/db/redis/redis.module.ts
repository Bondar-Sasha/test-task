import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { EnvService } from '@cfg'

@Module({
   imports: [
      ClientsModule.registerAsync([
         {
            name: 'REDIS_AUTH_SERVICE',
            useFactory: (envService: EnvService) => {
               const { REDIS_AUTH_DB, REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } =
                  envService.getRedisCredentials()

               return {
                  transport: Transport.REDIS,
                  options: {
                     host: REDIS_HOST,
                     port: REDIS_PORT,
                     username: REDIS_USERNAME,
                     password: REDIS_PASSWORD,
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
