import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common'
import { AccessTokenMiddleware, RefreshTokenMiddleware } from 'utils/TokensCheckMiddleware'

import { BasicAuthService } from './basic-auth/basic-auth.service'
import { LocalRegistrationRequest, LocalRegistrationResponse } from '../DTO/RegistrationDTO.dto'
import { AppRoutesService } from '@cfg'

const { prefix, localRegistrationRoute, localLoginRoute, logoutRoute } = AppRoutesService.getAuthRoutes()

@Controller(prefix)
export class BasicAuthController {
   constructor(private readonly basicAuthService: BasicAuthService) {}

   @Post(localRegistrationRoute)
   async registration(
      @Body()
      registrationData: LocalRegistrationRequest,
   ): Promise<LocalRegistrationResponse> {
      return await this.basicAuthService.registration(registrationData)
   }

   @Patch(localLoginRoute)
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
