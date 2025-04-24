import { Injectable, BadRequestException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import { EnvService } from '@cfg'
import { AuthTypes } from '@test_task/types'
import { UserRepository } from 'db/postgres/repositories'
import { TokensService } from 'auth/jwt/tokens/tokens.service'
import { Request } from 'express'
import { AuthenticateOptions } from 'passport'

export interface GoogleRequestObj extends Request {
   user: AuthTypes.UserCreds & AuthTypes.Tokens
}
interface GoogleAuthOptions extends AuthenticateOptions {
   callbackURL: string
}

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy) {
   user: AuthTypes.UserCreds & AuthTypes.Tokens

   constructor(
      private readonly envService: EnvService,
      private readonly postgresUserRepo: UserRepository,
      private readonly tokensService: TokensService,
   ) {
      const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = envService.getGoogleCredentials()
      super({
         clientID: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
         callbackURL: GOOGLE_CALLBACK_URL,
         passReqToCallback: true,
         scope: ['email', 'profile'],
      })
   }
   authenticate(req: Request, options?: GoogleAuthOptions): void {
      const action = req.path.includes('registration') ? 'registration' : 'login'

      const authOptions: GoogleAuthOptions = {
         ...options,
         callbackURL: `${this.envService.getGoogleCredentials().GOOGLE_CALLBACK_URL}/${action}`,
      }
      super.authenticate(req, authOptions)
   }

   async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
      const action = req.path.includes('registration') ? 'registration' : 'login'
      const email = profile.emails?.[0]?.value

      if (!email) {
         return done(new Error('Google authentication failed'))
      }

      const userFromDB = await this.postgresUserRepo.getSnapshotByEmail(email)

      if (action === 'registration') {
         if (userFromDB) {
            return done(new BadRequestException('User with this email already exists'))
         }
         const dbRes = await this.postgresUserRepo.saveSnapshot({
            email,
            provider: 'google',
            is_verified_email: true,
         })
         return done(null, { dbRes, ...this.tokensService.generateTokens({ userId: dbRes.id }) })
      }

      if (!userFromDB) {
         return done(new BadRequestException('User with this email does not exist'))
      }

      if (userFromDB.provider !== 'google') {
         return done(new BadRequestException(`User has created an account via ${userFromDB.provider} service`))
      }

      const tokens = this.tokensService.generateTokens({ userId: userFromDB.id })
      const dbRes = await this.postgresUserRepo.rewriteRefreshToken(userFromDB.id, tokens.refresh_token)

      done(null, { ...dbRes, ...tokens })
   }
}
