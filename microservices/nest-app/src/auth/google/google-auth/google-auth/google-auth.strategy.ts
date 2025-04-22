import { Injectable, BadRequestException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import { EnvService } from '@cfg'
import { Postgres, AuthTypes } from '@test_task/types'
import { UserRepository } from 'db/postgres/repositories'
import { TokensService } from 'auth/jwt/tokens/tokens.service'

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy) {
   user: AuthTypes.UserCreds & AuthTypes.Tokens

   constructor(
      private readonly configService: EnvService,
      private readonly postgresUserRepo: UserRepository,
      private readonly tokensService: TokensService,
   ) {
      const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = configService.getGoogleCredentials()
      super({
         clientID: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
         callbackURL: GOOGLE_CALLBACK_URL,
         scope: ['email', 'profile'],
      })
   }

   async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
      // : Promise<AuthTypes.UserCreds & AuthTypes.Tokens>
      done(null, profile)

      // const email = profile.emails?.[0]?.value

      // if (!email) {
      //    throw new Error('Google authentication failed')
      // }

      // const existingUser = await this.postgresUserRepo.getSnapshotByEmail(email)

      // return existingUser ? this.handleExistingUser(existingUser) : this.handleNewUser(email)
   }

   // private async handleExistingUser(user: Postgres.UserSnapshot): Promise<AuthTypes.UserCreds & AuthTypes.Tokens> {
   //    const tokens = this.tokensService.generateTokens({ userId: user.id })
   //    return {
   //       ...user,
   //       ...tokens,
   //       username: user.username || user.email,
   //    }
   // }

   // private async handleNewUser(email: string): Promise<AuthTypes.UserCreds & AuthTypes.Tokens> {
   //    const newUser = await this.postgresUserRepo.saveSnapshot({
   //       email,
   //       provider: 'google',
   //       is_verified_email: true,
   //    })

   //    const tokens = this.tokensService.generateTokens({ userId: newUser.id })

   //    return {
   //       ...newUser,
   //       ...tokens,
   //       username: newUser.username || newUser.email,
   //    }
   // }
}
