export namespace AuthTypes {
   export interface TokensCreatingPayload {
      userId: number
   }

   export interface Tokens {
      access_token: string
      refresh_token: string
   }

   export interface UserCreds {
      id: number
      email: string
      role: 'user' | 'admin'
      username: string
      provider: 'google' | 'github' | 'local'
      is_verified_email: boolean
      tel?: string
      access_token?: string
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
   export type ConfirmEmailResponse = void

   export interface LogoutRequest {
      id: number
   }
}
