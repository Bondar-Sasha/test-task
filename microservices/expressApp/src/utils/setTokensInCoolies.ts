import { Response } from 'express'

export const setTokensInCookies = (res: Response, access_token: string, refresh_token: string): void => {
   res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
   })
   res.cookie('access_token', access_token, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true })
}
