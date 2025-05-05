import { NextFunction, Request, Response } from 'express'
import ApiError from '../services/apiErrorsHandler.service'
import tokensService from '../services/tokens.service'
import { AuthTypes } from '@test_task/shared/types'

export default function refreshTokenMiddleware(
   req: AuthTypes.AuthenticatedRequest,
   _res: Response,
   next: NextFunction,
) {
   const refreshToken = req.cookies?.refresh_token

   if (!refreshToken) {
      throw ApiError.UnAuthorizedError()
   }

   const validationData = tokensService.isValidToken(refreshToken)
   if (!validationData) {
      throw ApiError.UnAuthorizedError()
   }

   req.tokenData = validationData
   req.refresh_token = refreshToken

   next()
}
