export namespace Postgres {
   export interface UserSnapshot {
      id: number
      email: string
      role: 'user' | 'admin'
      provider: 'google' | 'github' | 'local'
      is_verified_email: boolean
      refresh_token?: string | null
      tel?: string
      username?: string
      password?: string
   }
   export interface MakeUserSnapshot {
      email: string
      role?: 'user' | 'admin'
      provider?: 'google' | 'github' | 'local'
      is_verified_email?: boolean
      refresh_token?: string
      tel?: string
      username?: string
      password?: string
   }
}
