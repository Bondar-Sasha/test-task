export namespace AuthPostgres {
   export interface UserCredsSnapshot {
      id: number
      email: string
      tel: string | null
      username: string | null
      role: 'user' | 'admin'
      provider: 'google' | 'github' | 'local'
      is_verified_email: boolean
      refresh_token: string | null
      password: string | null
      soft_delete_date: Date | null
   }

   export interface MakeUserCredsSnapshot {
      email: string
      role?: 'user' | 'admin'
      provider?: 'google' | 'github' | 'local'
      is_verified_email?: boolean
      refresh_token?: string
      password?: string
      soft_delete_date?: Date
      tel?: string
      username?: string
   }
   export interface UpdateUserCredsSnapshot {
      email?: string
      role?: 'user' | 'admin'
      provider?: 'google' | 'github' | 'local'
      is_verified_email?: boolean
      refresh_token?: string | null
      password?: string
      soft_delete_date?: Date
      tel?: string
      username?: string
   }
}
