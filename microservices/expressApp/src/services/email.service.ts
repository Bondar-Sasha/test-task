import { createTransport, Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import envVars from './env.service'

class EmailNotification {
   private readonly transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>
   constructor() {
      this.transporter = createTransport({
         host: envVars.EMAIL_HOST,
         port: envVars.EMAIL_PORT,
         auth: {
            user: envVars.EMAIL_USER,
            pass: envVars.EMAIL_PASSWORD,
         },
      })
   }

   async sendMail(to: string, subject: string, text: string) {
      await this.transporter.sendMail({
         from: `"Instagram App" <${envVars.EMAIL_USER}>`,
         to,
         subject,
         text,
      })
   }
}

export default new EmailNotification()
