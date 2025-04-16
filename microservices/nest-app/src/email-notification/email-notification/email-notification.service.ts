import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { EnvService } from '@cfg'

@Injectable()
export class EmailNotificationService {
   private transporter: nodemailer.Transporter
   constructor(private readonly envService: EnvService) {
      const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = this.envService.getEmailNotificationsCredentials()
      this.transporter = nodemailer.createTransport({
         host: EMAIL_HOST,
         port: EMAIL_PORT,
         auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
         },
      })
   }

   async sendMail(to: string, subject: string, text: string) {
      const { EMAIL_USER } = this.envService.getEmailNotificationsCredentials()

      await this.transporter.sendMail({
         from: `"Instagram App" <${EMAIL_USER}>`,
         to,
         subject,
         text,
      })
   }
}
