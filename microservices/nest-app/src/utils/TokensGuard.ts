import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

import { AuthTypes } from '@test_task/types'
import { TokensService } from 'auth/jwt/tokens/tokens.service'

export interface AuthenticatedRequest extends Request {
   tokenData: AuthTypes.TokensCreatingPayload
   refresh_token: string
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
   constructor(private readonly tokensService: TokensService) {}

   canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest<AuthenticatedRequest>()

      const accessToken = req.cookies?.access_token as string

      if (!accessToken) {
         throw new UnauthorizedException('Access token is missing')
      }

      const validationData = this.tokensService.isValidToken(accessToken)
      if (!validationData) {
         throw new UnauthorizedException('Access token is not valid')
      }
      return true
   }
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
   constructor(private readonly tokensService: TokensService) {}

   canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest<AuthenticatedRequest>()

      const refreshToken = req.cookies?.refresh_token as string

      if (!refreshToken) {
         throw new UnauthorizedException('Refresh token is missing')
      }

      const validationData = this.tokensService.isValidToken(refreshToken)
      if (!validationData) {
         throw new UnauthorizedException('Refresh token is not valid')
      }

      req.tokenData = validationData
      req.refresh_token = refreshToken
      return true
   }
}
