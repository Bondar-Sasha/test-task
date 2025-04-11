import { Module } from '@nestjs/common'

import { ConnectionService } from './connection/connection.service'

@Module({
   controllers: [],
   providers: [ConnectionService],
})
export class RedisModule {}
