import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'

import { AppRoutesService } from '@cfg'
import { GoogleAuthService, GoogleRequestObj } from './google-auth/google-auth.strategy'
import { TokensService } from './../../jwt/tokens/tokens.service'

const { prefix, googleRegisterRoute, googleLoginRoute } = AppRoutesService.getAuthRoutes()
@Controller(prefix)
export class GoogleAuthController {
   constructor(
      private readonly googleAuthService: GoogleAuthService,
      private readonly tokensService: TokensService,
   ) {}

   @Get(googleLoginRoute)
   @UseGuards(AuthGuard('google'))
   googleLogin() {}

   @Get(googleRegisterRoute)
   @UseGuards(AuthGuard('google'))
   googleRegister() {}

   @Get('google/callback/login')
   @Redirect('/', 302)
   @UseGuards(AuthGuard('google'))
   loginCallback(@Req() req: GoogleRequestObj, @Res({ passthrough: true }) res: Response) {
      res.cookie('refresh_token', req.user.refresh_token, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true,
      })
      res.cookie('access_token', req.user.access_token, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true })
   }

   @Get('google/callback/registration')
   @Redirect('/', 302)
   @UseGuards(AuthGuard('google'))
   registerCallback(@Req() req: GoogleRequestObj, @Res({ passthrough: true }) res: Response) {
      res.cookie('refresh_token', req.user.refresh_token, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true,
      })
      res.cookie('access_token', req.user.access_token, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true })
   }
}
