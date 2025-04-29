import express, { RequestHandler } from 'express'
import { body } from 'express-validator'
import passport from 'passport'
import localAuthController from './controllers/localAuth.controller'
import { AppRoutes } from '@test_task/shared/routes'
import accessTokenMiddleware from './middlewares/accessToken.middleware'
import refreshTokenMiddleware from './middlewares/refreshToken.middleware'
import { baseAuthUrl } from './utils'
import badRequestMiddleware from './middlewares/badRequest.middleware'
import googleAuthController from './controllers/googleAuth.controller'
import githubAuthController from './controllers/githubAuth.controller'
import envVars from './services/env.service'

const {
   localRegistrationRoute,
   localLoginRoute,
   logoutRoute,
   confirmEmailRoute,
   refreshTokensRoute,
   googleLoginRoute,
   googleRegisterRoute,
   googleCallbackRoute,

   githubLoginRoute,
   githubRegisterRoute,
   githubCallbackRoute,

   resendCodeRoute,
} = AppRoutes.authRoutes()

const router = express.Router()

router.post(
   baseAuthUrl + localRegistrationRoute,
   [
      body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),

      body('password')
         .isString()
         .withMessage('Password must be a string')
         .isLength({ min: 6, max: 15 })
         .withMessage('Password must be between 6 and 15 characters')
         .notEmpty()
         .withMessage('Password is required'),

      body('tel').optional().isMobilePhone('any', { strictMode: true }).withMessage('Invalid phone number format'),

      body('username')
         .optional()
         .isLength({ min: 6, max: 15 })
         .withMessage('Username must be between 6 and 15 characters'),
      badRequestMiddleware,
   ],
   localAuthController.registration,
)
router.patch(
   baseAuthUrl + localLoginRoute,
   [
      body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),

      body('password')
         .isString()
         .withMessage('Password must be a string')
         .isLength({ min: 6, max: 15 })
         .withMessage('Password must be between 6 and 15 characters')
         .notEmpty()
         .withMessage('Password is required'),
      badRequestMiddleware,
   ],
   localAuthController.login,
)
router.post(
   baseAuthUrl + confirmEmailRoute(),
   [body('code').notEmpty().withMessage('Code is required'), badRequestMiddleware],
   localAuthController.confirmEmail,
)
router.get(
   baseAuthUrl + refreshTokensRoute,
   accessTokenMiddleware,
   refreshTokenMiddleware as RequestHandler,
   localAuthController.refreshTokens as unknown as RequestHandler,
)
router.patch(
   baseAuthUrl + logoutRoute,
   accessTokenMiddleware,
   refreshTokenMiddleware as RequestHandler,
   localAuthController.logout as unknown as RequestHandler,
)

router.get(baseAuthUrl + resendCodeRoute(), localAuthController.resendCode)

router.get([baseAuthUrl + googleLoginRoute, baseAuthUrl + googleRegisterRoute], googleAuthController.googleAuth)

router.get(baseAuthUrl + googleCallbackRoute, googleAuthController.authCallbackHandler)

router.get([baseAuthUrl + githubLoginRoute, baseAuthUrl + githubRegisterRoute], githubAuthController.githubAuth)

router.get(baseAuthUrl + githubCallbackRoute, githubAuthController.authCallbackHandler)

export default router
