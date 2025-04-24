import { Injectable } from '@nestjs/common'

@Injectable()
export class AppRoutesService {
   static getAuthRoutes() {
      return {
         prefix: '/auth',

         logoutRoute: '/logout',

         localRegistrationRoute: '/local/registration',
         localLoginRoute: '/local/login',
         refreshTokensRoute: '/refreshTokens',
         confirmEmailRoute: (UrlForCode?: string | number) => `/confirmEmail/${UrlForCode || ':urlForCode'}`,
         sendCodeRoute: '/sendCode',

         githubRegisterRoute: '/github/registration',
         githubLoginRoute: '/github/login',
         githubRegisterCallbackRoute: '/github/callback/registration',
         githubLoginCallbackRoute: '/github/callback/login',

         googleRegisterRoute: '/google/registration',
         googleLoginRoute: '/google/login',
         googleRegisterCallbackRoute: '/google/callback/registration',
         googleLoginCallbackRoute: '/google/callback/login',
      }
   }
}
