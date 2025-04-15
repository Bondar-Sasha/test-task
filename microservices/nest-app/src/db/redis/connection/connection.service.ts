import { Injectable, Inject } from '@nestjs/common'

import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ConnectionService {
   constructor(@Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy) {}
}
