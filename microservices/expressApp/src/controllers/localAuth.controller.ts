import { Request, Response } from 'express'
import { baseAuthUrl, RedirectResponse, setTokensInCookies } from '../utils'
import { AuthTypes } from '@test_task/shared/types'
import { AppRoutes } from '@test_task/shared/routes'
import localAuthService from '../services/localAuth.service'
import tokensService from 'src/services/tokens.service'

const { localLoginRoute } = AppRoutes.authRoutes()

const userWithTokensGuard = (data: AuthTypes.Tokens | RedirectResponse): data is RedirectResponse => {
   return 'statusCode' in data
}

class LocalAuthController {
   async registration(req: Request, res: Response) {
      await localAuthService.registration(req.body)
      res.redirect(301, baseAuthUrl + localLoginRoute)
   }

   async login({ body: { email, password } }: Request, res: Response) {
      const serviceRes = await localAuthService.login(email, password)

      if (userWithTokensGuard(serviceRes)) {
         return res.redirect(serviceRes.statusCode, serviceRes.url)
      }
      setTokensInCookies(res, serviceRes.access_token, serviceRes.refresh_token)
      res.redirect(302, '/')
   }

   async confirmEmail({ body: { code }, params: { urlForCode } }: Request, res: Response) {
      const { refresh_token, access_token } = await localAuthService.confirmEmail(parseInt(urlForCode), code)

      setTokensInCookies(res, access_token, refresh_token)
      res.redirect(301, '/')
   }

   async refreshTokens({ tokenData: { userId }, ...req }: AuthTypes.AuthenticatedRequest, res: Response) {
      const { refresh_token, access_token } = await localAuthService.refreshTokens(userId, req.refresh_token)

      setTokensInCookies(res, access_token, refresh_token)
      res.json()
   }
   async resendCode({ params: { urlForCode } }: Request, res: Response) {
      await localAuthService.resendCode(parseInt(urlForCode))
      res.json()
   }

   async logout({ tokenData: { userId } }: AuthTypes.AuthenticatedRequest, res: Response) {
      await localAuthService.logout(userId)

      res.clearCookie('refresh_token')
      res.clearCookie('access_token')
      res.json()
   }
   tokensValidation({ body: { access_token, refresh_token } }: Request, res: Response) {
      const { isValidToken } = tokensService
      res.json({ validation: [isValidToken(access_token), isValidToken(refresh_token)] })
   }
}

export default new LocalAuthController()
