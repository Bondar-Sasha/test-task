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

   export interface DeleteUserRequest {
      id: number
      soft_delete_date: Date
   }

   export interface TokensValidationAndRefreshRequest {
      tel: string | null
      username: string | null
      email: string
   }
}
