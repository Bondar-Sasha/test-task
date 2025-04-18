export interface AppEnvs {
   APP_MODE: 'development' | 'production'
   CLIENT_URL: string
   JWT_SECRET: string

   EXPRESS_APP_PORT: number
   NEST_APP_PORT: number

   POSTGRES_HOST_AUTH_METHOD: string
   POSTGRES_USER: string
   POSTGRES_PASSWORD: string
   POSTGRES_HOST: string
   POSTGRES_DB: string
   POSTGRES_PORT: number

   REDIS_USERNAME: string
   REDIS_PASSWORD: string
   REDIS_HOST: string
   REDIS_PORT: number
   REDIS_AUTH_DB: number

   MONGO_INITDB_ROOT_USERNAME: string
   MONGO_INITDB_ROOT_PASSWORD: string
   MONGO_INITDB_DATABASE: string
   MONGO_LOG_LEVEL: string
   MONGO_HOST: string
   MONGO_PORT: number

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
