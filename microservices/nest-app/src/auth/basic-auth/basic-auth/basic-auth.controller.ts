import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common'
import { AccessTokenMiddleware, RefreshTokenMiddleware } from 'utils/TokensCheckMiddleware'

import { BasicAuthService } from './basic-auth/basic-auth.service'
import {
   RegistrationAttemptRequest,
   RegistrationAttemptResponse,
   CommitRegistrationRequest,
   CommitRegistrationResponse,
} from '../DTO/RegistrationDTO.dto'
import { AppRoutesService } from '@cfg'

const { prefix, registrationAttemptRoute, registrationCommitRoute, loginRoute, logoutRoute } =
   AppRoutesService.getAuthRoutes()

@Controller(prefix)
export class BasicAuthController {
   constructor(private readonly basicAuthService: BasicAuthService) {}

   @Post(registrationAttemptRoute)
   async registrationAttempt(
      @Body() registrationData: RegistrationAttemptRequest,
   ): Promise<RegistrationAttemptResponse> {
      return await this.basicAuthService.registrationAttempt(registrationData)
   }

   // @Post(registrationCommitRoute())
   // async registrationCommit(@Body() registrationData: CommitRegistrationRequest): Promise<CommitRegistrationResponse> {
   //    // return await this.basicAuthService.registrationCommit(registrationData)
   // }

   @Patch(loginRoute)
   @UseGuards(RefreshTokenMiddleware)
   login() {
      return 'login'
   }

   @Patch(logoutRoute)
   @UseGuards(AccessTokenMiddleware)
   logout() {
      return 'logout'
   }
}
