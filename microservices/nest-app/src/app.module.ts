import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CfgModule } from '@cfg'
import { DbModule } from './db/db.module'
import { EmailNotificationModule } from './email-notification/email-notification.module'
import { UserModule } from './user/user.module';

@Module({
   imports: [
      HttpModule.register({
         maxRedirects: 5,
      }),
      CfgModule,
      DbModule,
      EmailNotificationModule,
      UserModule,
   ],

   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
