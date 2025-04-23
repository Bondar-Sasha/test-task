import { BadRequestException, HttpRedirectResponse, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { InjectRedis } from '@nestjs-modules/ioredis'

import { AuthTypes } from '@test_task/types'
import { TokensService } from 'auth/jwt/tokens/tokens.service'
import { EmailNotificationService } from 'email-notification/email-notification/email-notification.service'
import { UserRepository } from 'db/postgres/repositories'

import { AppRoutesService } from '@cfg'
import { RedirectDto } from '@utils'

const { prefix, confirmEmailRoute } = AppRoutesService.getAuthRoutes()

@Injectable()
export class BasicAuthService {
   constructor(
      @InjectRedis() private readonly redisAuthClient: Redis,
      private readonly postgresUserRepo: UserRepository,
      private readonly tokensService: TokensService,
      private readonly emailNotificationService: EmailNotificationService,
   ) {}

   async registration(userData: AuthTypes.LocalRegistrationRequest): Promise<AuthTypes.UserCreds> {
      const isDataUnique = await this.postgresUserRepo.isEmailAndUsernameUnique(userData.email, userData.username)

      if (!isDataUnique) {
         throw new BadRequestException('User with this email or username already exists')
      }

      const hashPassword = await this.tokensService.hashPassword(userData.password)

      const userFromDB = await this.postgresUserRepo.saveSnapshot({ ...userData, password: hashPassword })

      return { ...userFromDB, username: userData.username || userFromDB.email }
   }

   async login(
      email: string,
      password: string,
   ): Promise<(AuthTypes.UserCreds & AuthTypes.Tokens) | HttpRedirectResponse> {
      const user = await this.postgresUserRepo.getSnapshotByEmail(email)

      if (!user) {
         throw new BadRequestException('User with this email does not exist')
      }

      if (user.provider !== 'local') {
         throw new BadRequestException(`User has created an account via ${user.provider} service`)
      }

      const isPasswordValid = await this.tokensService.compareHashes(password, user.password)
      if (!isPasswordValid) {
         throw new BadRequestException('Invalid email or password')
      }

      const tokens = this.tokensService.generateTokens({ userId: user.id })

      if (!user.is_verified_email) {
         const generatedCode = this.tokensService.generateCode()
         await Promise.all([
            this.redisAuthClient.set(String(user.id), generatedCode),
            this.emailNotificationService.sendMail(
               user.email,
               'Email verification',
               `Your verification code: ${generatedCode}`,
            ),
         ])
         return {
            url: '/api' + prefix + confirmEmailRoute(user.id),
            statusCode: 302,
         }
      }

      await this.postgresUserRepo.rewriteRefreshToken(user.id, tokens.refresh_token)

      return { ...user, ...tokens, username: user.username || user.email }
   }
   async confirmEmail(urlForCode: number, code: number): Promise<void | RedirectDto> {
      const user = await this.postgresUserRepo.getSnapshot(urlForCode)

      if (!user) {
         throw new BadRequestException('User does not exist')
      }
      const codeFromRedis = await this.redisAuthClient.get(String(urlForCode))

      if (!codeFromRedis || codeFromRedis !== String(code)) {
         throw new BadRequestException('Invalid code')
      }
      await Promise.all([
         this.redisAuthClient.del(String(urlForCode)),
         this.postgresUserRepo.rewriteIsVerifiedEmail(user.id, true),
      ])
   }
   async refreshTokens(id: number, refreshToken: string): Promise<AuthTypes.Tokens> {
      const user = await this.postgresUserRepo.getSnapshot(id)
      if (!user) {
         throw new BadRequestException('User does not exist')
      }
      if (user.refresh_token !== refreshToken) {
         throw new BadRequestException('Invalid refresh token')
      }

      const tokens = this.tokensService.generateTokens({ userId: user.id })

      await this.postgresUserRepo.rewriteRefreshToken(user.id, tokens.refresh_token)

      return tokens
   }
   async logout(id: number): Promise<void> {
      const user = await this.postgresUserRepo.getSnapshot(id)

      if (!user) {
         throw new BadRequestException('User does not exist')
      }
      await this.postgresUserRepo.rewriteRefreshToken(user.id, null)
   }
}
