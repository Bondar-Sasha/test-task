import { NextFunction, Request, Response } from 'express'
import passport, { AuthenticateOptions } from 'passport'
import { VerifyCallback } from 'passport-oauth2'
import { Profile, Strategy } from 'passport-google-oauth20'
import envVars from '../services/env.service'
import { ServiceAuthOptions, setTokensInCookies } from '../utils'
import tokensService from '../services/tokens.service'
import ApiError from '../services/apiErrorsHandler.service'
import userRepository from '../user.repository'
import { AuthTypes } from '@test_task/shared/types'

class GoogleAuthController {
   private readonly strategy: Strategy

   constructor() {
      this.strategy = new Strategy(
         {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
            scope: ['email', 'profile'],
         },
         this.afterAuth,
      )
      passport.use(this.strategy)
   }

   googleAuth(req: Request, res: Response, next: NextFunction): void {
      const action = req.path.includes('registration') ? 'registration' : 'login'

      const options: ServiceAuthOptions = {
         scope: ['email', 'profile'],
         state: action,
         callbackURL: envVars.GOOGLE_CALLBACK_URL,
      }

      passport.authenticate('google', options)(req, res, next)
   }

   async afterAuth(
      req: Request,
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
   ): Promise<void> {
      try {
         const action = String(req.query.state)

         if (!['registration', 'login'].includes(action)) {
            return done(ApiError.BadRequest('Invalid action'))
         }
         const email = profile.emails?.[0]?.value

         if (!email) {
            return done(ApiError.BadRequest('Email not provided by Google'))
         }

         const userFromDB = await userRepository.getUser({ email })

         if (action === 'registration') {
            if (userFromDB) {
               return done(ApiError.BadRequest('User with this email already exists'))
            }
            const dbRes = await userRepository.createUser({
               email,
               provider: 'google',
               is_verified_email: true,
            })
            return done(null, tokensService.generateTokens({ userId: dbRes.id }))
         }

         if (!userFromDB) {
            return done(ApiError.BadRequest('User with this email does not exist'))
         }

         if (userFromDB.provider !== 'google') {
            return done(ApiError.BadRequest(`User account was created via ${userFromDB.provider} service`))
         }

         const tokens = tokensService.generateTokens({ userId: userFromDB.id })
         await userRepository.updateUser(userFromDB.id, {
            refresh_token: tokens.refresh_token,
         })

         done(null, tokens)
      } catch (error) {
         done(ApiError.ServerError())
      }
   }

   authCallbackHandler(req: Request, res: Response, next: NextFunction): void {
      passport.authenticate(
         'google',
         {
            failureRedirect: '/',
            successRedirect: '/',
         },
         (err: unknown, tokens: AuthTypes.Tokens) => {
            if (err) {
               res.redirect(`/`)
               return next(ApiError.BadRequest('Google authentication failed', [err]))
            }
            setTokensInCookies(res, tokens.access_token, tokens.refresh_token)
            res.redirect(`/`)
         },
      )(req, res, next)
   }
}

export default new GoogleAuthController()
