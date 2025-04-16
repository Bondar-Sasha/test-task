import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { createHash } from 'crypto'

import { TokensCreatingPayload } from '@test_task/types'

@Injectable()
export class TokensService {
   constructor(private readonly jwtService: JwtService) {}

   generateTokens(payload: TokensCreatingPayload) {
      return {
         accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
         refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      }
   }
   generateCode(): number {
      return Math.floor(100000 + Math.random() * 900000)
   }

   getUniqueStr(payload: string) {
      return createHash('md5').update(payload).digest('hex').slice(0, 40)
   }

   isValidToken(token: string) {
      try {
         return this.jwtService.verify<TokensCreatingPayload>(token)
      } catch {
         return null
      }
   }
}
