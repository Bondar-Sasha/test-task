import { Request } from 'express'

export namespace AuthTypes {
   export interface TokensCreatingPayload {
      userId: number
   }

   export interface Tokens {
      access_token: string
      refresh_token: string
   }
   export interface AuthenticatedRequest extends Request {
      tokenData: TokensCreatingPayload
      refresh_token: string
   }

   export interface UserCreds {
      id: number
      email: string
      role: 'user' | 'admin'
      username: string
      provider: 'google' | 'github' | 'local'
      tel?: string
   }

   export interface LocalRegistrationRequest {
      email: string
      password: string
      username?: string
      tel?: string
   }

   export interface LoginRequest {
      email: string
      password: string
   }

   export interface ConfirmEmailRequest {
      code: number
   }
}
