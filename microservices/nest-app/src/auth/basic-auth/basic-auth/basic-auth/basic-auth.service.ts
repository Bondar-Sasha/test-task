import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { AppRoutesService } from '@cfg'
import { AuthTypes } from '@test_task/types'
import { TokensService } from 'auth/jwt/tokens/tokens.service'
import { EmailNotificationService } from 'email-notification/email-notification/email-notification.service'

@Injectable()
export class BasicAuthService {
   constructor(
      @Inject('REDIS_AUTH_SERVICE') private readonly redisAuthClient: ClientProxy,
      private readonly tokensService: TokensService,
      private readonly emailNotificationService: EmailNotificationService,
   ) {}

   async registrationAttempt(
      userData: AuthTypes.RegistrationAttemptRequest,
   ): Promise<AuthTypes.RegistrationAttemptResponse> {
      try {
         const generatedCode = this.tokensService.generateCode()
         const generatedChuckOfUrl = this.tokensService.getUniqueStr('')

         await this.emailNotificationService.sendMail(
            userData.email,
            'Confirm your email',
            `Your code: ${generatedCode}`,
         )

         this.redisAuthClient.emit(generatedChuckOfUrl, JSON.stringify({ ...userData, code: generatedCode }))

         return { confirmEmailUrl: 'http://localhost:3001/api/auth/registration/commit/' + generatedChuckOfUrl }
      } catch (error) {
         console.log(error)
         throw new InternalServerErrorException(error, 'Mail sending error')
      }
   }
   // registrationCommit(userData: AuthTypes.CommitRegistrationRequest): AuthTypes.CommitRegistrationResponse {}
}
