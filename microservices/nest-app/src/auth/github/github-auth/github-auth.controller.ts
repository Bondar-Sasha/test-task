import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response, Request } from 'express'

import { AppRoutesService } from '@cfg'

const { prefix, githubRegisterRoute, githubLoginRoute, githubCallbackRoute } = AppRoutesService.getAuthRoutes()

@Controller(prefix)
@UseGuards(AuthGuard('github'))
export class GithubAuthController {
   @Get(githubLoginRoute)
   githubLogin() {}

   @Get(githubRegisterRoute)
   githubRegister() {}

   @Get(githubCallbackRoute)
   githubCallback(@Req() req: Request, @Res() res: Response) {
      console.log(req.user)

      const message =
         origin === 'register'
            ? '✅ Регистрация через Github прошла успешно!'
            : '✅ Вход через Github выполнен успешно!'

      return res.send(message)
   }
}
