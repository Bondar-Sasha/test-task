import { Module } from '@nestjs/common'
import { RedisModule as ExternalRedisModule } from '@nestjs-modules/ioredis'

import { EnvService } from '@cfg'

@Module({
   imports: [
      ExternalRedisModule.forRootAsync({
         useFactory: (envService: EnvService) => {
            const { REDIS_AUTH_DB, REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } =
               envService.getRedisCredentials()

            return {
               type: 'single',
               options: {
                  password: REDIS_PASSWORD,
                  username: REDIS_USERNAME,
                  port: REDIS_PORT,
                  host: REDIS_HOST,
                  db: REDIS_AUTH_DB,
               },
            }
         },
         inject: [EnvService],
      }),
   ],
})
export class RedisModule {}
