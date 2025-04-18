export namespace AuthTypes {
   export interface LocalRegistrationRequest {
      email: string
      password: string
      username?: string
      tel?: string
   }

   export interface LocalRegistrationResponse {
      id: number
      email: string
      role: 'user' | 'admin'
      username: string
      provider: 'google' | 'github' | 'local'
      is_verified_email: boolean
      tel?: string
   }

   // export interface LoginRequest {
   //    email: string
   //    password: string
   // }
   // export interface LoginResponse {
   //    email: string
   //    accessToken: string
   // }
   // export type LogoutRequest = void

   // export type LogoutResponse = void
}
