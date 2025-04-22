import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { AccessTokenGuard, AuthenticatedRequest, RedirectDto, RefreshTokenGuard, UserCredsDto } from '@utils'
import { BasicAuthService } from './basic-auth/basic-auth.service'
import { LocalRegistrationRequest } from '../DTO/RegistrationDTO.dto'
import { LoginRequest } from '../DTO/LoginDTO.dto'
import { AppRoutesService } from '@cfg'
import { ConfirmEmailRequest } from '../DTO/ConfirmEmailDTO.dto'
import { LogoutRequest } from '../DTO/LogoutDTO.dto'
import { TokensDto } from '../DTO/TokensDTO.dto'

const { prefix, localRegistrationRoute, localLoginRoute, logoutRoute, confirmEmailRoute, refreshTokensRoute } =
   AppRoutesService.getAuthRoutes()

const userWithTokensGuard = (data: (UserCredsDto & TokensDto) | RedirectDto): data is UserCredsDto & TokensDto => {
   return 'refresh_token' in data
}

@Controller(prefix)
export class BasicAuthController {
   constructor(private readonly basicAuthService: BasicAuthService) {}

   @Post(localRegistrationRoute)
   async registration(
      @Body()
      registrationData: LocalRegistrationRequest,
   ): Promise<UserCredsDto> {
      return new UserCredsDto(await this.basicAuthService.registration(registrationData))
   }

   @Patch(localLoginRoute)
   async login(
      @Body()
      { email, password }: LoginRequest,
      @Res({ passthrough: true }) res: Response,
   ): Promise<UserCredsDto | RedirectDto> {
      const serviceRes = await this.basicAuthService.login(email, password)

      if (userWithTokensGuard(serviceRes)) {
         res.cookie('refresh_token', serviceRes.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
         return new UserCredsDto(serviceRes)
      }

      return serviceRes
   }

   @Patch(confirmEmailRoute())
   @Redirect('/', 302)
   async confirmEmail(
      @Param('urlForCode', ParseIntPipe) urlForCode: number,
      @Body() { code }: ConfirmEmailRequest,
   ): Promise<void> {
      await this.basicAuthService.confirmEmail(urlForCode, code)
   }

   @Get(refreshTokensRoute)
   @UseGuards(AccessTokenGuard)
   @UseGuards(RefreshTokenGuard)
   async refreshTokens(
      @Req() req: AuthenticatedRequest,
      @Res({ passthrough: true }) res: Response,
   ): Promise<TokensDto> {
      const serviceRes = await this.basicAuthService.refreshTokens(req.tokenData.userId, req.refresh_token)
      res.cookie('refresh_token', serviceRes.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return serviceRes
   }

   @Patch(logoutRoute)
   @UseGuards(AccessTokenGuard)
   @UseGuards(RefreshTokenGuard)
   async logout(@Body() { id }: LogoutRequest, @Res({ passthrough: true }) res: Response): Promise<void> {
      await this.basicAuthService.logout(id)
      res.clearCookie('refresh_token')
   }
}
