import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CfgModule } from '@cfg'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module';
import { EmailNotificationModule } from './email-notification/email-notification.module';

@Module({
   imports: [CfgModule, DbModule, AuthModule, EmailNotificationModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
