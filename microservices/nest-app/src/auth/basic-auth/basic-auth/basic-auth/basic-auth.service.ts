import { Injectable, InternalServerErrorException } from '@nestjs/common'
import Redis from 'ioredis'
import { InjectRedis } from '@nestjs-modules/ioredis'

import { AppRoutesService } from '@cfg'
import { AuthTypes } from '@test_task/types'
import { TokensService } from 'auth/jwt/tokens/tokens.service'
import { EmailNotificationService } from 'email-notification/email-notification/email-notification.service'

@Injectable()
export class BasicAuthService {
   constructor(
      @InjectRedis() private readonly redisAuthClient: Redis,
      private readonly tokensService: TokensService,
      private readonly emailNotificationService: EmailNotificationService,
   ) {}

   async registrationAttempt(
      userData: AuthTypes.RegistrationAttemptRequest,
   ): Promise<AuthTypes.RegistrationAttemptResponse> {
      try {
         const generatedCode = this.tokensService.generateCode()
         const generatedChuckOfUrl = this.tokensService.getUniqueStr('')
         await this.redisAuthClient.set(generatedChuckOfUrl, JSON.stringify({ code: generatedCode }))
         const g = await this.redisAuthClient.get(generatedChuckOfUrl)
         console.log(g)
         /*
          * Сначала отправляем данные в Redis
          * await Promise.all([
          *    // this.emailNotificationService.sendMail(userData.email, 'Confirm your email', `Your code: ${generatedCode}`),
          *    // this.redisAuthClient.set(generatedChuckOfUrl, JSON.stringify({ ...userData, code: generatedCode })),
          * ])
          */
         return { confirmEmailUrl: 'http://localhost:3001/api/auth/registration/commit/' + generatedChuckOfUrl }
      } catch (error) {
         console.log(error)
         throw new InternalServerErrorException(error, 'Mail sending error')
      }
   }
   // registrationCommit(userData: AuthTypes.CommitRegistrationRequest): AuthTypes.CommitRegistrationResponse {
   //    this.redisAuthClient.set(("")=>{})

   // }
}
