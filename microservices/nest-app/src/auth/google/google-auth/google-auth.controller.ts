import { AppRoutesService, EnvService } from '@cfg'
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'

const { prefix, googleRegisterRoute, googleLoginRoute, googleCallbackRoute } = AppRoutesService.getAuthRoutes()

@Controller(prefix)
export class GoogleAuthController {
   constructor(private readonly envService: EnvService) {}

   @Get(googleLoginRoute)
   @UseGuards(AuthGuard('google'))
   googleLogin() {
      // Handled by Passport
   }

   @Get(googleRegisterRoute)
   @UseGuards(AuthGuard('google'))
   googleRegister() {
      // Handled by Passport
   }

   @Get(googleCallbackRoute)
   @UseGuards(AuthGuard('google'))
   async googleCallback(@Req() req: any, @Res() res: Response) {
      try {
         // The validated user data will be available in req.user
         const user = req.user

         if (!user) {
            return res.redirect('/auth/error?message=Authentication failed')
         }

         const origin = req.query.state as string
         const redirectUrl =
            origin === 'register'
               ? `/auth/success?message=Registration successful&email=${encodeURIComponent(user.email)}`
               : `/auth/success?message=Login successful&email=${encodeURIComponent(user.accessToken)}`

         return res.redirect(redirectUrl)
      } catch (error) {
         console.error('Google authentication error:', error)
         return res.redirect('/auth/error?message=Authentication failed')
      }
   }
}
