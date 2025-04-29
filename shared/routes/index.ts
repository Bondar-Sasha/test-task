export class AppRoutes {
   static backendPrefix = '/api'

   static authRoutes() {
      return {
         prefix: '/auth',

         logoutRoute: '/logout',
         localRegistrationRoute: '/local/registration',
         localLoginRoute: '/local/login',
         refreshTokensRoute: '/refreshTokens',
         confirmEmailRoute: (UrlForCode?: string | number) => `/confirmEmail/${UrlForCode || ':urlForCode'}`,
         resendCodeRoute: (UrlForCode?: string | number) => `/resendCode/${UrlForCode || ':urlForCode'}`,

         githubRegisterRoute: '/github/registration',
         githubLoginRoute: '/github/login',
         githubCallbackRoute: '/github/callback',

         googleCallbackRoute: '/google/callback',
         googleRegisterRoute: '/google/registration',
         googleLoginRoute: '/google/login',
      }
   }
}
