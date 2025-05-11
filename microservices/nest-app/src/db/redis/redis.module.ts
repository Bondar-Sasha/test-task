import { Module } from '@nestjs/common'
import { RedisModule as ExternalRedisModule } from '@nestjs-modules/ioredis'

import { ConfigService } from '@nestjs/config'

@Module({
   imports: [
      ExternalRedisModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (cfgService: ConfigService) => {
            return {
               type: 'single',
               url: cfgService.get('REDIS_AUTH_DB_URL'),
            }
         },
      }),
   ],
})
export class RedisModule {}
