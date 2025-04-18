import { Injectable } from '@nestjs/common'

@Injectable()
export class AppRoutesService {
   static getAuthRoutes() {
      return {
         prefix: '/auth',

         logoutRoute: '/logout',

         localRegistrationRoute: '/local/registration',
         localLoginRoute: '/local/login',
         confirmEmailRoute: '/confirmEmail',
         sendCodeRoute: '/sendCode',

         githubRegisterRoute: '/github/registration',
         githubLoginRoute: '/github/login',
         githubCallbackRoute: '/github/callback',

         googleRegisterRoute: '/google/registration',
         googleLoginRoute: '/google/login',
         googleCallbackRoute: '/google/callback',
      }
   }
}
