import { NextFunction, Request, Response } from 'express'
import { AuthenticatedRequest, baseAuthUrl, RedirectResponse, setTokensInCookies } from '../utils'
import { AuthTypes } from '@test_task/shared/types'
import { AppRoutes } from '@test_task/shared/routes'
import localAuthService from '../services/localAuth.service'

const { localLoginRoute, confirmEmailRoute } = AppRoutes.authRoutes()

const userWithTokensGuard = (data: AuthTypes.Tokens | RedirectResponse): data is RedirectResponse => {
   return 'statusCode' in data
}

class LocalAuthController {
   async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
      await localAuthService.registration(req.body)
      res.redirect(301, baseAuthUrl + localLoginRoute)
   }

   async login(req: Request, res: Response): Promise<void> {
      const { email, password } = req.body
      const serviceRes = await localAuthService.login(email, password)

      if (userWithTokensGuard(serviceRes)) {
         return res.redirect(serviceRes.statusCode, serviceRes.url)
      }
      setTokensInCookies(res, serviceRes.access_token, serviceRes.refresh_token)
      res.redirect(302, '/')
   }

   async confirmEmail(req: Request, res: Response): Promise<void> {
      const urlForCode = parseInt(req.params.urlForCode)
      const { code } = req.body
      const { refresh_token, access_token } = await localAuthService.confirmEmail(urlForCode, code)

      setTokensInCookies(res, access_token, refresh_token)
      res.redirect(301, '/')
   }

   async refreshTokens(req: AuthenticatedRequest, res: Response): Promise<void> {
      const { refresh_token, access_token } = await localAuthService.refreshTokens(
         req.tokenData.userId,
         req.refresh_token,
      )

      setTokensInCookies(res, access_token, refresh_token)
      res.json()
   }
   async resendCode(req: Request, res: Response): Promise<void> {
      const urlForCode = parseInt(req.params.urlForCode)
      await localAuthService.resendCode(urlForCode)
      res.redirect(301, baseAuthUrl + confirmEmailRoute(urlForCode))
   }

   async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
      await localAuthService.logout(req.tokenData.userId)
      res.clearCookie('refresh_token')
      res.clearCookie('access_token')
      res.json()
   }
}

export default new LocalAuthController()
