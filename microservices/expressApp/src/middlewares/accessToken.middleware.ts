import { NextFunction, Request, Response } from 'express'
import ApiError from '../services/apiErrorsHandler.service'
import tokensService from '../services/tokens.service'

export default function accessTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
   const access_token = req.cookies?.access_token
   if (!access_token) {
      throw ApiError.UnAuthorizedError()
   }

   const validationData = tokensService.isValidToken(access_token)

   if (!validationData) {
      throw ApiError.UnAuthorizedError()
   }

   next()
}
