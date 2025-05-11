import Redis from 'ioredis'

import { AuthTypes } from '@test_task/shared/types'
import tokensService from './tokens.service'
import envVars from './env.service'
import { AppRoutes } from '@test_task/shared/routes'
import { prismaClient } from '..'
import ApiError from './apiErrorsHandler.service'
import { RedirectResponse } from '../utils'
import userRepository from '../user.repository'
import emailService from './email.service'

const { prefix, confirmEmailRoute } = AppRoutes.authRoutes()

const redisClient = new Redis(envVars.REDIS_AUTH_DB_URL)

class BasicAuthService {
   async registration(userData: AuthTypes.LocalRegistrationRequest): Promise<void> {
      // const isDataUnique = await prismaClient.$transaction([
      //    userRepository.getUser({ email: userData.email }),
      //    userRepository.getUser({ username: userData.username }),
      // ])
      // if (isDataUnique[0] || isDataUnique[1]) {
      //    throw ApiError.BadRequest('User with this email or username already exists')
      // }
      // const hashPassword = await tokensService.hashPassword(userData.password)
      // await userRepository.createUser({ ...userData, password: hashPassword })
   }

   async login(email: string, password: string): Promise<RedirectResponse | AuthTypes.Tokens> {
      // const user = await userRepository.getUser({ email })

      // if (!user) {
      //    throw ApiError.BadRequest('User with this email does not exist')
      // }

      // if (user.provider !== 'local') {
      //    throw ApiError.BadRequest(`User has created an account via ${user.provider} service`)
      // }

      // const isPasswordValid = await tokensService.compareHashes(password, user.password || undefined)
      // if (!isPasswordValid) {
      //    throw ApiError.BadRequest('Invalid email or password')
      // }

      // if (!user.is_verified_email) {
      //    const generatedCode = tokensService.generateCode()
      //    await Promise.all([
      //       redisClient.set(String(user.id), generatedCode),
      //       emailService.sendMail(user.email, 'Email verification', `Your verification code: ${generatedCode}`),
      //    ])
      //    return {
      //       url: '/api' + prefix + confirmEmailRoute(user.id),
      //       statusCode: 301,
      //    }
      // }
      // const tokens = tokensService.generateTokens({ userId: user.id })

      // await userRepository.updateUser(user.id, { refresh_token: tokens.refresh_token })

      // return tokens

      return {
         url: '/api' + prefix + confirmEmailRoute(1),
         statusCode: 301,
      }
   }
   async confirmEmail(urlForCode: number, code: number): Promise<Promise<AuthTypes.Tokens>> {
      const user = await userRepository.getUser({ id: urlForCode })

      if (!user) {
         throw ApiError.BadRequest('User does not exist')
      }
      const codeFromRedis = await redisClient.get(String(urlForCode))

      if (!codeFromRedis || codeFromRedis !== String(code)) {
         throw ApiError.BadRequest('Invalid code')
      }
      const tokens = tokensService.generateTokens({ userId: user.id })
      await Promise.all([
         redisClient.del(String(urlForCode)),
         userRepository.updateUser(user.id, { refresh_token: tokens.refresh_token, is_verified_email: true }),
      ])

      return tokens
   }
   async refreshTokens(id: number, refreshToken: string): Promise<AuthTypes.Tokens> {
      const user = await userRepository.getUser({ id })
      if (!user) {
         throw ApiError.BadRequest('User does not exist')
      }
      if (user.refresh_token !== refreshToken) {
         throw ApiError.BadRequest('Invalid refresh token')
      }

      const tokens = tokensService.generateTokens({ userId: user.id })

      await userRepository.updateUser(user.id, { refresh_token: tokens.refresh_token })

      return tokens
   }
   async logout(id: number): Promise<void> {
      const user = await userRepository.getUser({ id })

      if (!user) {
         throw ApiError.BadRequest('User does not exist')
      }
      await userRepository.updateUser(user.id, { refresh_token: null })
   }
   async resendCode(urlForCode: number): Promise<void> {
      // const user = await userRepository.getUser({ id: urlForCode })
      // if (!user) {
      //    throw ApiError.BadRequest('User does not exist')
      // }
      // if (user.is_verified_email) {
      //    throw ApiError.BadRequest('Email is already verified')
      // }
      // const generatedCode = tokensService.generateCode()
      // await Promise.all([
      //    redisClient.set(String(user.id), generatedCode),
      //    emailService.sendMail(user.email, 'Email verification', `Your verification code: ${generatedCode}`),
      // ])
   }
}

export default new BasicAuthService()
