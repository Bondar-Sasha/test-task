import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'

import { AppRoutesService } from '@cfg'
import { GoogleAuthService, GoogleRequestObj } from './google-auth/google-auth.strategy'
import { TokensService } from './../../jwt/tokens/tokens.service'
import { setTokensInCookies } from 'auth/utils'

const { prefix, googleRegisterRoute, googleLoginRoute, googleLoginCallbackRoute, googleRegisterCallbackRoute } =
   AppRoutesService.getAuthRoutes()

@ApiTags('auth/google')
@Controller(prefix)
export class GoogleAuthController {
   constructor(
      private readonly googleAuthService: GoogleAuthService,
      private readonly tokensService: TokensService,
   ) {}

   @Get([googleLoginRoute, googleRegisterRoute])
   @UseGuards(AuthGuard('google'))
   googleAuth() {}

   @ApiExcludeEndpoint()
   @Get([googleLoginCallbackRoute, googleRegisterCallbackRoute])
   @Redirect('/', 302)
   @UseGuards(AuthGuard('google'))
   private authCallback(@Req() { user: { access_token, refresh_token } }: GoogleRequestObj, @Res() res: Response) {
      setTokensInCookies(res, access_token, refresh_token)
   }
}
