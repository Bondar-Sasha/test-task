import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'

import { AppRoutesService, EnvService } from '@cfg'

import { GoogleAuthService } from './google-auth/google-auth.strategy'
import { Response } from 'express'

const { prefix, googleRegisterRoute, googleLoginRoute, googleCallbackRoute } = AppRoutesService.getAuthRoutes()
@Controller(prefix)
export class GoogleAuthController {
   constructor(private readonly googleAuthService: GoogleAuthService) {}

   @Get(googleLoginRoute)
   @UseGuards(AuthGuard('google'))
   googleLogin() {}

   @Get(googleRegisterRoute)
   @UseGuards(AuthGuard('google'))
   googleRegister() {}

   @Get(googleCallbackRoute)
   @Redirect('/', 302)
   @UseGuards(AuthGuard('google'))
   googleCallback(@Req() res: Response & { user: any }) {
      console.log(res.user)
   }
}
