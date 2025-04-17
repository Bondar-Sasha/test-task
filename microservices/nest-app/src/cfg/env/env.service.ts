import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppEnvs } from '@test_task/types'

@Injectable()
export class EnvService {
   constructor(private configService: ConfigService<AppEnvs, true>) {}
   getJwtSecret() {
      return this.configService.get('JWT_SECRET', { infer: true })
   }

   getClientUrl() {
      return this.configService.get('CLIENT_URL', { infer: true })
   }

   getAppMode() {
      return this.configService.get('APP_MODE', { infer: true })
   }

   getAppPort() {
      return this.configService.get('NEST_APP_PORT', { infer: true })
   }

   getPostgresCredentials() {
      return {
         POSTGRES_USER: this.configService.get('POSTGRES_USER', { infer: true }),
         POSTGRES_PASSWORD: this.configService.get('POSTGRES_PASSWORD', { infer: true }),
         POSTGRES_DB: this.configService.get('POSTGRES_DB', { infer: true }),
         POSTGRES_HOST:
            this.getAppMode() === 'development'
               ? 'localhost'
               : this.configService.get('POSTGRES_HOST', { infer: true }),
         POSTGRES_PORT: this.configService.get('POSTGRES_PORT', { infer: true }),
      }
   }

   getRedisCredentials() {
      return {
         REDIS_USERNAME: this.configService.get('REDIS_USERNAME', { infer: true }),
         REDIS_PASSWORD: this.configService.get('REDIS_PASSWORD', { infer: true }),
         REDIS_HOST:
            this.getAppMode() === 'development' ? 'localhost' : this.configService.get('REDIS_HOST', { infer: true }),
         REDIS_PORT: this.configService.get('REDIS_PORT', { infer: true }),
         REDIS_AUTH_DB: this.configService.get('REDIS_AUTH_DB', { infer: true }),
      }
   }
   getEmailNotificationsCredentials() {
      return {
         EMAIL_HOST: this.configService.get('EMAIL_HOST', { infer: true }),
         EMAIL_PORT: this.configService.get('EMAIL_PORT', { infer: true }),
         EMAIL_USER: this.configService.get('EMAIL_USER', { infer: true }),
         EMAIL_PASSWORD: this.configService.get('EMAIL_PASSWORD', { infer: true }),
      }
   }

   getMongoCredentials() {
      return {
         MONGO_INITDB_ROOT_USERNAME: this.configService.get('MONGO_INITDB_ROOT_USERNAME', { infer: true }),
         MONGO_INITDB_ROOT_PASSWORD: this.configService.get('MONGO_INITDB_ROOT_PASSWORD', { infer: true }),
         MONGO_INITDB_DATABASE: this.configService.get('MONGO_INITDB_DATABASE', { infer: true }),
         MONGO_HOST:
            this.getAppMode() === 'development' ? 'localhost' : this.configService.get('MONGO_HOST', { infer: true }),
         MONGO_PORT: this.configService.get('MONGO_PORT', { infer: true }),
      }
   }
   getGoogleCredentials() {
      return {
         GOOGLE_CLIENT_ID: this.configService.get('GOOGLE_CLIENT_ID', { infer: true }),
         GOOGLE_CLIENT_SECRET: this.configService.get('GOOGLE_CLIENT_SECRET', { infer: true }),
         GOOGLE_CALLBACK_URL: this.configService.get('GOOGLE_CALLBACK_URL', { infer: true }),
      }
   }
   getGithubCredentials() {
      return {
         GITHUB_CLIENT_ID: this.configService.get('GITHUB_CLIENT_ID', { infer: true }),
         GITHUB_CLIENT_SECRET: this.configService.get('GITHUB_CLIENT_SECRET', { infer: true }),
         GITHUB_CALLBACK_URL: this.configService.get('GITHUB_CALLBACK_URL', { infer: true }),
      }
   }
}
