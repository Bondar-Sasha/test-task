import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'

import { AppRoutesService } from '@cfg'
import { setTokensInCookies } from 'auth/utils'
import { GitHubRequestObj } from './github-auth/github-auth.strategy'

const { prefix, githubRegisterRoute, githubLoginRoute, githubRegisterCallbackRoute, githubLoginCallbackRoute } =
   AppRoutesService.getAuthRoutes()

@ApiTags('auth/github')
@Controller(prefix)
@UseGuards(AuthGuard('github'))
export class GithubAuthController {
   @Get([githubLoginRoute, githubRegisterRoute])
   @UseGuards(AuthGuard('github'))
   githubAuth() {}

   @ApiExcludeEndpoint()
   @Get([githubLoginCallbackRoute, githubRegisterCallbackRoute])
   @Redirect('/', 302)
   @UseGuards(AuthGuard('gitHub'))
   private loginOrRegisterCallback(
      @Req() { user: { access_token, refresh_token } }: GitHubRequestObj,
      @Res() res: Response,
   ) {
      setTokensInCookies(res, access_token, refresh_token)
   }
}
