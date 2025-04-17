import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { Injectable } from '@nestjs/common'

import { EnvService } from '@cfg'

@Injectable()
export class GithubAuthService extends PassportStrategy(Strategy, 'github') {
   constructor(private readonly configService: EnvService) {
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = configService.getGithubCredentials()
      super({
         clientID: GITHUB_CLIENT_ID,
         clientSecret: GITHUB_CLIENT_SECRET,
         callbackURL: GITHUB_CALLBACK_URL,
         scope: ['user:email'],
      })
   }

   validate() {}
}
