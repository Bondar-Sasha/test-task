export namespace Postgres {
   export interface UserSnapshot {
      id: number
      email: string
      role: 'user' | 'admin'
      refresh_token: string
      provider: 'google' | 'github' | 'local'
      is_verified_email: boolean
      tel?: string
      username?: string
      password?: string
   }
}
