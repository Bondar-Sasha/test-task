import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-github2'
import { VerifyCallback } from 'passport-oauth2'
import { Injectable } from '@nestjs/common'
import { AuthenticateOptions } from 'passport'
import { Request } from 'express'

import { EnvService } from '@cfg'
import { AuthTypes } from '@test_task/types'
import { UserRepository } from 'db/postgres/repositories'
import { TokensService } from 'auth/jwt/tokens/tokens.service'

export interface GitHubRequestObj extends Request {
   user: AuthTypes.UserCreds & AuthTypes.Tokens
}
interface GitHubAuthOptions extends AuthenticateOptions {
   callbackURL: string
}

@Injectable()
export class GithubAuthService extends PassportStrategy(Strategy, 'github') {
   constructor(
      private readonly envService: EnvService,
      private readonly postgresUserRepo: UserRepository,
      private readonly tokensService: TokensService,
   ) {
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = envService.getGithubCredentials()
      super({
         clientID: GITHUB_CLIENT_ID,
         clientSecret: GITHUB_CLIENT_SECRET,
         callbackURL: GITHUB_CALLBACK_URL,
         passReqToCallback: true,
         scope: ['user:email'],
      })
   }

   authenticate(req: Request, options?: GitHubAuthOptions): void {
      const action = req.path.includes('registration') ? 'registration' : 'login'

      const authOptions: GitHubAuthOptions = {
         ...options,
         callbackURL: `${this.envService.getGithubCredentials().GITHUB_CALLBACK_URL}/${action}`,
      }
      super.authenticate(req, authOptions)
   }

   async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
      const action = req.path.includes('registration') ? 'registration' : 'login'
      const email = profile.emails?.[0]?.value

      if (!email || !action) {
         return done(new Error('GitHub authentication failed'))
      }

      const userFromDB = await this.postgresUserRepo.getSnapshotByEmail(email)

      if (action === 'registration') {
         if (userFromDB) {
            return done(new Error('User with this email already exists'))
         }
         const dbRes = await this.postgresUserRepo.saveSnapshot({
            email,
            provider: 'github',
            is_verified_email: true,
         })
         return done(null, { dbRes, ...this.tokensService.generateTokens({ userId: dbRes.id }) })
      }

      if (!userFromDB) {
         return done(new Error('User with this email does not exist'))
      }

      if (userFromDB.provider !== 'github') {
         return done(new Error(`User has created an account via ${userFromDB.provider} service`))
      }

      const tokens = this.tokensService.generateTokens({ userId: userFromDB.id })
      const dbRes = await this.postgresUserRepo.rewriteRefreshToken(userFromDB.id, tokens.refresh_token)

      done(null, { ...dbRes, ...tokens })
   }
}
