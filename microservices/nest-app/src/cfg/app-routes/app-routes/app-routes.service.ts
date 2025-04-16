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
      }
   }
}
