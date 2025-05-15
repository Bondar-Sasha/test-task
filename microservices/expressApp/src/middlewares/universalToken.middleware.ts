import { NextFunction, Response } from 'express'

import ApiError from '../services/apiErrorsHandler.service'
import tokensService from 'src/services/tokens.service'
import { AuthTypes } from '@test_task/shared/types'

export default (refreshTokenOnly: boolean) =>
   (req: AuthTypes.AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
         const refreshToken = req.cookies?.refresh_token
         const accessToken = req.cookies?.access_token

         if (!refreshToken || !accessToken) {
            throw ApiError.UnAuthorizedError()
         }

         const refreshTokenValidationData = tokensService.isValidToken(refreshToken)

         if (!refreshTokenValidationData) {
            throw ApiError.UnAuthorizedError()
         }

         if (refreshTokenOnly) {
            req.tokenData = refreshTokenValidationData
            req.refresh_token = refreshToken
            return next()
         }

         const accessTokenValidationData = tokensService.isValidToken(accessToken)

         if (!accessTokenValidationData) {
            throw ApiError.UnAuthorizedError()
         }

         req.tokenData = refreshTokenValidationData
         req.refresh_token = refreshToken
         next()
      } catch (error) {
         next(error)
      }
   }
