import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-github2'
import envVars from '../services/env.service'
import { Profile } from 'passport-github2'
import { VerifyCallback } from 'passport-oauth2'
import { ServiceAuthOptions, setTokensInCookies } from '../utils'
import ApiError from '../services/apiErrorsHandler.service'
import userRepository from '../user.repository'
import tokensService from '../services/tokens.service'
import { AuthTypes } from '@test_task/shared/types'

class GithubAuthController {
   private readonly strategy: Strategy

   constructor() {
      this.strategy = new Strategy(
         {
            clientID: envVars.GITHUB_CLIENT_ID,
            clientSecret: envVars.GITHUB_CLIENT_SECRET,
            callbackURL: envVars.GITHUB_CALLBACK_URL,
            passReqToCallback: true,
            scope: ['user:email'],
         },
         this.afterAuth.bind(this),
      )
      passport.use(this.strategy)
   }

   githubAuth(req: Request, res: Response, next: NextFunction): void {
      const action = req.path.includes('registration') ? 'registration' : 'login'

      const options: ServiceAuthOptions = {
         scope: ['user:email'],
         state: action,
         callbackURL: envVars.GITHUB_CALLBACK_URL,
      }

      passport.authenticate('github', options)(req, res, next)
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
            return done(ApiError.BadRequest('Email not provided by Github'))
         }

         // const userFromDB = await userRepository.getUser({ email })

         // if (action === 'registration') {
         //    if (userFromDB) {
         //       return done(ApiError.BadRequest('User with this email already exists'))
         //    }
         //    const dbRes = await userRepository.createUser({
         //       // email,
         //       provider: 'github',
         //       is_verified_email: true,
         //    })
         //    return done(null, tokensService.generateTokens({ userId: dbRes.id }))
         // }

         // if (!userFromDB) {
         //    return done(ApiError.BadRequest('User with this email does not exist'))
         // }

         // if (userFromDB.provider !== 'github') {
         //    return done(ApiError.BadRequest(`User account was created via ${userFromDB.provider} service`))
         // }

         // const tokens = tokensService.generateTokens({ userId: userFromDB.id })
         // await userRepository.updateUser(userFromDB.id, {
         //    refresh_token: tokens.refresh_token,
         // })

         // done(null, tokens)
      } catch (error) {
         done(ApiError.ServerError())
      }
   }

   authCallbackHandler(req: Request, res: Response, next: NextFunction): void {
      passport.authenticate(
         'github',
         {
            failureRedirect: '/',
            successRedirect: '/',
         },
         (err: unknown, tokens: AuthTypes.Tokens) => {
            if (err) {
               res.redirect(`/`)
               return next(ApiError.BadRequest('Github authentication failed', [err]))
            }
            setTokensInCookies(res, tokens.access_token, tokens.refresh_token)
            res.redirect(`/`)
         },
      )(req, res, next)
   }
}

export default new GithubAuthController()
