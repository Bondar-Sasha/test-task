import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CfgModule } from '@cfg'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module';

@Module({
   imports: [CfgModule, DbModule, AuthModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
