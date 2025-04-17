import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-google-oauth20'
import { EnvService } from '@cfg'

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, 'google') {
   constructor(private readonly configService: EnvService) {
      const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = configService.getGoogleCredentials()
      super({
         clientID: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
         callbackURL: GOOGLE_CALLBACK_URL,
         scope: ['email', 'profile'],
      })
   }

   validate(accessToken: string, refreshToken: string, profile: Profile) {
      const { name, emails, photos } = profile

      const user = {
         email: emails?.[0].value,
         firstName: name?.givenName,
         lastName: name?.familyName,
         accessToken,
      }

      return user
   }
}
