import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, compare } from 'bcrypt'

import { AuthTypes } from '@test_task/types'

@Injectable()
export class TokensService {
   constructor(private readonly jwtService: JwtService) {}

   generateTokens(payload: AuthTypes.TokensCreatingPayload): AuthTypes.Tokens {
      return {
         access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
         refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
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
   async generateUrl(data: string): Promise<string> {
      return await hash(data, 10)
   }

   isValidToken(token: string) {
      try {
         return this.jwtService.verify<AuthTypes.TokensCreatingPayload>(token)
      } catch {
         return null
      }
   }
}
