import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, compare } from 'bcrypt'

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

   async hashPassword(password: string) {
      return await hash(password, 12)
   }
   async compareHashes(password: string, hash: string) {
      return await compare(password, hash)
   }

   isValidToken(token: string) {
      try {
         return this.jwtService.verify<TokensCreatingPayload>(token)
      } catch {
         return null
      }
   }
}
