export namespace AuthTypes {
   export interface RegistrationAttemptRequest {
      email: string
      password: string
      username: string
      tel: string
   }
   export interface RegistrationAttemptResponse {
      confirmEmailUrl: string
   }

   export interface CommitRegistrationRequest {
      codeFromEmail: number
   }
   export interface CommitRegistrationResponse {
      id: number
      email: string
      username: string
      tel: string
      accessToken: string
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
