import { NextFunction, Response } from 'express'

import ApiError from '../services/apiErrorsHandler.service'
import tokensService from 'src/services/tokens.service'
import basicAuthService from 'src/services/localAuth.service'
import { setTokensInCookies } from 'src/utils'
import { AuthTypes } from '@test_task/shared/types'

export default (autoRefresh: boolean) =>
   async (req: AuthTypes.AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
         const refreshToken = req.cookies?.refresh_token
         const accessToken = req.cookies?.access_token

         if (!refreshToken || !accessToken) {
            throw ApiError.UnAuthorizedError()
         }

         const refreshTokenValidationData = tokensService.isValidToken(refreshToken)
         const accessTokenValidationData = tokensService.isValidToken(accessToken)

         if (!refreshTokenValidationData) {
            throw ApiError.UnAuthorizedError()
         }
         if (accessTokenValidationData) {
            req.tokenData = refreshTokenValidationData
            return next()
         }

         if (!autoRefresh) {
            throw ApiError.UnAuthorizedError()
         }
         const { refresh_token, access_token } = await basicAuthService.refreshTokens(
            refreshTokenValidationData.userId,
            refreshToken,
         )

         setTokensInCookies(res, access_token, refresh_token)

         req.tokenData = refreshTokenValidationData
         next()
      } catch (error) {
         next(error)
      }
   }
