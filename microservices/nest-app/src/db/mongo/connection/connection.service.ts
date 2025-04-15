import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

@Injectable()
export class ConnectionService implements OnModuleDestroy {
   constructor(@InjectConnection() private readonly connection: Connection) {}

   async onModuleDestroy() {
      await this.connection.close()
   }

   getClient(): Connection {
      return this.connection
   }
}
