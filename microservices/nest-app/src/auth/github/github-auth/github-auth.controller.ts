import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'

import { AppRoutesService } from '@cfg'
import { setTokensInCookies } from 'auth/utils'
import { GitHubRequestObj } from './github-auth/github-auth.strategy'

const { prefix, githubRegisterRoute, githubLoginRoute, githubRegisterCallbackRoute, githubLoginCallbackRoute } =
   AppRoutesService.getAuthRoutes()

@Controller(prefix)
@UseGuards(AuthGuard('github'))
export class GithubAuthController {
   @Get(`${githubLoginRoute}|${githubRegisterRoute}`)
   @UseGuards(AuthGuard('github'))
   githubAuth() {}

   @Get(`${githubLoginCallbackRoute}|${githubRegisterCallbackRoute}`)
   @Redirect('/', 302)
   @UseGuards(AuthGuard('gitHub'))
   loginOrRegisterCallback(@Req() req: GitHubRequestObj, @Res() res: Response) {
      setTokensInCookies(res, req.user.access_token, req.user.refresh_token)
   }
}
