import {
   Body,
   Controller,
   Get,
   HttpRedirectResponse,
   Param,
   ParseIntPipe,
   Patch,
   Post,
   Redirect,
   Req,
   Res,
   UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { AccessTokenGuard, AuthenticatedRequest, RefreshTokenGuard } from '@utils'
import { BasicAuthService } from './basic-auth/basic-auth.service'
import { LocalRegistrationRequest } from '../DTO/RegistrationDTO.dto'
import { LoginRequest } from '../DTO/LoginDTO.dto'
import { AppRoutesService } from '@cfg'
import { ConfirmEmailRequest } from '../DTO/ConfirmEmailDTO.dto'
import { AuthTypes } from '@test_task/types'
import { setTokensInCookies } from 'auth/utils'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

const { prefix, localRegistrationRoute, localLoginRoute, logoutRoute, confirmEmailRoute, refreshTokensRoute } =
   AppRoutesService.getAuthRoutes()

const userWithTokensGuard = (data: AuthTypes.Tokens | HttpRedirectResponse): data is HttpRedirectResponse => {
   return 'statusCode' in data
}
@ApiResponse({ status: 301 })
@ApiTags('auth/app')
@Controller(prefix)
export class BasicAuthController {
   constructor(private readonly basicAuthService: BasicAuthService) {}

   @Redirect(localLoginRoute, 301)
   @Post(localRegistrationRoute)
   async registration(
      @Body()
      registrationData: LocalRegistrationRequest,
   ): Promise<void> {
      await this.basicAuthService.registration(registrationData)
   }

   @Redirect('/', 301)
   @Patch(localLoginRoute)
   async login(
      @Body()
      { email, password }: LoginRequest,
      @Res({ passthrough: true }) res: Response,
   ): Promise<void> {
      const serviceRes = await this.basicAuthService.login(email, password)

      if (!userWithTokensGuard(serviceRes)) {
         setTokensInCookies(res, serviceRes.access_token, serviceRes.refresh_token)
      }
   }

   @Patch(confirmEmailRoute())
   @Redirect('/', 301)
   async confirmEmail(
      @Param('urlForCode', ParseIntPipe) urlForCode: number,
      @Body() { code }: ConfirmEmailRequest,
      @Res({ passthrough: true }) res: Response,
   ): Promise<void> {
      const serviceRes = await this.basicAuthService.confirmEmail(urlForCode, code)
      setTokensInCookies(res, serviceRes.access_token, serviceRes.refresh_token)
   }

   @Get(refreshTokensRoute)
   @UseGuards(AccessTokenGuard)
   @UseGuards(RefreshTokenGuard)
   async refreshTokens(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response): Promise<void> {
      const serviceRes = await this.basicAuthService.refreshTokens(req.tokenData.userId, req.refresh_token)
      setTokensInCookies(res, serviceRes.access_token, serviceRes.refresh_token)
   }

   @Patch(logoutRoute)
   @UseGuards(AccessTokenGuard)
   @UseGuards(RefreshTokenGuard)
   async logout(
      @Req() { tokenData: { userId } }: AuthenticatedRequest,
      @Res({ passthrough: true }) res: Response,
   ): Promise<void> {
      await this.basicAuthService.logout(userId)
      res.clearCookie('refresh_token')
      res.clearCookie('access_token')
   }
}
