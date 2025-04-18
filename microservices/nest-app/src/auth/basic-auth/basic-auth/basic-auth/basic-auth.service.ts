import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import Redis from 'ioredis'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Response } from 'express'

import { AuthTypes } from '@test_task/types'
import { TokensService } from 'auth/jwt/tokens/tokens.service'
import { EmailNotificationService } from 'email-notification/email-notification/email-notification.service'
import { UserRepository } from 'db/postgres/repositories'

@Injectable()
export class BasicAuthService {
   constructor(
      @InjectRedis() private readonly redisAuthClient: Redis,
      private readonly postgresUserRepo: UserRepository,
      private readonly tokensService: TokensService,
      private readonly emailNotificationService: EmailNotificationService,
   ) {}

   async registration(userData: AuthTypes.LocalRegistrationRequest): Promise<AuthTypes.LocalRegistrationResponse> {
      try {
         const isDataUnique = await this.postgresUserRepo.isEmailAndUsernameUnique(userData.email, userData.username)

         if (!isDataUnique) {
            throw new BadRequestException('User with this email or username already exists')
         }

         const hashPassword = await this.tokensService.hashPassword(userData.password)

         const userFromDB = await this.postgresUserRepo.saveSnapshot({ ...userData, password: hashPassword })

         return { ...userFromDB, username: userData.username || userFromDB.email }
      } catch (error) {
         throw new InternalServerErrorException(error)
      }
   }

   async login(email: string, password: string, res: Response) {
      const user = await this.postgresUserRepo.getSnapshotByEmail(email)
      if (!user) {
         throw new BadRequestException('User with this email does not exist')
      }
      if (user.provider !== 'local') {
         throw new BadRequestException(`User has created an account vie ${user.provider} service`)
      }
      if (!user.is_verified_email) {
         const generatedCode = this.tokensService.generateCode()

         await Promise.all([
            this.redisAuthClient.set(user.email, generatedCode),
            this.emailNotificationService.sendMail(
               user.email,
               'Email verification',
               `Your verification code: ${generatedCode}`,
            ),
         ])
         res.redirect()
         return
      }
   }
}
