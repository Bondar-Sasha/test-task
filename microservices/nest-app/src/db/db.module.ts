import { Module } from '@nestjs/common'

import { RedisModule } from './redis/redis.module'
import { MongoModule } from './mongo/mongo.module'
import { PostgresModule } from './postgres/postgres.module'

@Module({
   imports: [RedisModule, MongoModule, PostgresModule],
})
export class DbModule {}
