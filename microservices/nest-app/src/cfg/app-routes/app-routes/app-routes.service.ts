import { Injectable } from '@nestjs/common'

@Injectable()
export class AppRoutesService {
   static getAuthRoutes() {
      return {
         prefix: '/auth',
         registrationAttemptRoute: '/registration/attempt',
         registrationCommitRoute: (url?: string) => `/registration/commit/${url || ':urlForCode'}`,
         loginRoute: '/login',
         logoutRoute: '/logout',

         githubRegisterRoute: '/github/registration',
         githubLoginRoute: '/github/login',
         githubCallbackRoute: '/github/callback',

         googleRegisterRoute: '/google/registration',
         googleLoginRoute: '/google/login',
         googleCallbackRoute: '/google/callback',
      }
   }
}
