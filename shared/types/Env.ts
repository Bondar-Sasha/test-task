export interface AppEnvs {
   APP_MODE: 'development' | 'production'
   CLIENT_URL: string
   JWT_SECRET: string
   ACCESS_TOKEN_EXPIRES_IN: string
   REFRESH_TOKEN_EXPIRES_IN: string

   EXPRESS_APP_PORT: number
   NEST_APP_PORT: number

   COMMON_POSTGRES_DB_URL: string
   AUTH_POSTGRES_DB_URL: string
   REDIS_AUTH_DB_URL: string
   MONGO_DB_URL: string

   EMAIL_HOST: string
   EMAIL_PORT: number
   EMAIL_USER: string
   EMAIL_PASSWORD: string

   GOOGLE_CLIENT_ID: string
   GOOGLE_CLIENT_SECRET: string
   GOOGLE_CALLBACK_URL: string

   GITHUB_CLIENT_ID: string
   GITHUB_CLIENT_SECRET: string
   GITHUB_CALLBACK_URL: string
}
