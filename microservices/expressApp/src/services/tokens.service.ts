import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { AuthTypes } from '@test_task/shared/types'
import envVars from './env.service'

class TokensService {
   generateTokens(payload: AuthTypes.TokensCreatingPayload): AuthTypes.Tokens {
      const access_token = jwt.sign(payload, envVars.JWT_SECRET, {
         expiresIn: '10m',
      })
      const refresh_token = jwt.sign(payload, envVars.JWT_SECRET, {
         expiresIn: '30d',
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
      return await hash(password, 12)
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
