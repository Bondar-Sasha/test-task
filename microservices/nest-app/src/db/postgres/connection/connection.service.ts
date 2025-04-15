import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class ConnectionService implements OnModuleDestroy {
   constructor(private dataSource: DataSource) {}

   async onModuleDestroy() {
      await this.dataSource.destroy()
   }

   getClient(): DataSource {
      return this.dataSource
   }
}
