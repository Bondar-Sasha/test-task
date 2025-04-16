import { Module } from '@nestjs/common'
import { EmailNotificationService } from './email-notification/email-notification.service'
import { CfgModule } from '@cfg'

@Module({
   imports: [CfgModule],
   providers: [EmailNotificationService],
   exports: [EmailNotificationService],
})
export class EmailNotificationModule {}
