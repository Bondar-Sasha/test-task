import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { TokensCreatingPayload } from '@test_task/types'
import { TokensService } from 'auth/jwt/tokens/tokens.service'

interface AuthenticatedRequest extends Request {
   tokenData?: TokensCreatingPayload
}

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
   constructor(private readonly tokensService: TokensService) {}

   use(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
      try {
         const accessToken = req.headers['authorization']?.split(' ')[1] as string

         if (!accessToken) {
            throw new UnauthorizedException('Access token is missing')
         }

         const validationData = this.tokensService.isValidToken(accessToken)

         if (!validationData) {
            throw new UnauthorizedException('Access token is not valid')
         }

         req.tokenData = validationData

         next()
      } catch (error) {
         next(error)
      }
   }
}

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
   constructor(private readonly tokensService: TokensService) {}

   use(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
      try {
         const refreshToken = req.cookies?.refreshToken as string
         if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is missing')
         }

         const validationData = this.tokensService.isValidToken(refreshToken)
         if (!validationData) {
            throw new UnauthorizedException('Refresh token is not valid')
         }

         req.tokenData = validationData

         next()
      } catch (error) {
         next(error)
      }
   }
}
