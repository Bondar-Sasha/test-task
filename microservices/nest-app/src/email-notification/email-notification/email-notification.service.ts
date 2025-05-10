import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailNotificationService {
   private transporter: nodemailer.Transporter
   constructor(private readonly cfgService: ConfigService) {
      this.transporter = nodemailer.createTransport({
         host: this.cfgService.get('EMAIL_HOST'),
         port: this.cfgService.get('EMAIL_PORT'),
         auth: {
            user: this.cfgService.get('EMAIL_USER'),
            pass: this.cfgService.get('EMAIL_PASSWORD'),
         },
      })
   }

   async sendMail(to: string, subject: string, text: string) {
      await this.transporter.sendMail({
         from: `"Instagram App" <${this.cfgService.get('EMAIL_USER')}>`,
         to,
         subject,
         text,
      })
   }
}
