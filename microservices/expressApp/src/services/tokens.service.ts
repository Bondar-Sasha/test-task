import { hash, compare, genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { AuthTypes } from '@test_task/shared/types'
import envVars from './env.service'

class TokensService {
   generateTokens(payload: AuthTypes.TokensCreatingPayload): AuthTypes.Tokens {
      const access_token = jwt.sign(payload, envVars.JWT_SECRET, {
         expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN,
      })
      const refresh_token = jwt.sign(payload, envVars.JWT_SECRET, {
         expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
      })
      return {
         access_token,
         refresh_token,
      }
   }
   generateCode(): number {
      return Math.floor(100000 + Math.random() * 900000)
   }

   async hashPassword(password: string) {
      const salt = await genSalt(12)
      return await hash(password, salt)
   }
   async compareHashes(password: string, hash?: string) {
      if (!hash) return false
      return await compare(password, hash)
   }

   isValidToken(token: string): AuthTypes.TokensCreatingPayload | null {
      try {
         return jwt.verify(token, envVars.JWT_SECRET) as AuthTypes.TokensCreatingPayload
      } catch {
         return null
      }
   }
}

export default new TokensService()
