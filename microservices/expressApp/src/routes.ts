import express, { RequestHandler } from 'express'
import { body } from 'express-validator'
import localAuthController from './controllers/localAuth.controller'
import { AppRoutes } from '@test_task/shared/routes'
import universalTokenMiddleware from './middlewares/universalToken.middleware'

import { baseAuthUrl } from './utils'
import badRequestMiddleware from './middlewares/badRequest.middleware'
import googleAuthController from './controllers/googleAuth.controller'
import githubAuthController from './controllers/githubAuth.controller'
import softDeleteController from './controllers/softDelete.controller'

const {
   localRegistrationRoute,
   localLoginRoute,
   logoutRoute,
   tokensValidationAndRefreshingRoute,
   confirmEmailRoute,
   googleLoginRoute,
   googleRegisterRoute,
   googleCallbackRoute,

   githubLoginRoute,
   githubRegisterRoute,
   githubCallbackRoute,

   resendCodeRoute,
} = AppRoutes.authRoutes()

const { deleteRoute, prefix, deleteTriggerRoute } = AppRoutes.userProfileRoutes()

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
   baseAuthUrl + tokensValidationAndRefreshingRoute,
   universalTokenMiddleware(true) as RequestHandler,
   localAuthController.tokensValidationAndRefresh as unknown as RequestHandler,
)

router.patch(
   baseAuthUrl + logoutRoute,
   universalTokenMiddleware(false) as RequestHandler,
   localAuthController.logout as unknown as RequestHandler,
)
router.get(baseAuthUrl + resendCodeRoute(), localAuthController.resendCode)

router.delete(baseAuthUrl + prefix + deleteTriggerRoute, softDeleteController.deleteUsers)
router.delete(
   baseAuthUrl + prefix + deleteRoute,
   [
      body('id').notEmpty().withMessage('Id is required').isInt().withMessage('Id must be an integer'),
      body('soft_delete_date')
         .isISO8601()
         .withMessage('Invalid date format')
         .notEmpty()
         .withMessage('soft_delete_date is required'),
      badRequestMiddleware,
   ],
   softDeleteController.deleteUser,
)

router.get([baseAuthUrl + googleLoginRoute, baseAuthUrl + googleRegisterRoute], googleAuthController.googleAuth)

router.get(baseAuthUrl + googleCallbackRoute, googleAuthController.authCallbackHandler)

router.get([baseAuthUrl + githubLoginRoute, baseAuthUrl + githubRegisterRoute], githubAuthController.githubAuth)

router.get(baseAuthUrl + githubCallbackRoute, githubAuthController.authCallbackHandler)

export default router
