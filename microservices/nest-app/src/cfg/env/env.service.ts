import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export type AppMode = 'development' | 'production'

@Injectable()
export class EnvService {
   constructor(private configService: ConfigService) {}

   getClientUrl() {
      return this.configService.get<string>('CLIENT_URL')
   }

   getAppMode(): AppMode {
      return this.configService.get<AppMode>('APP_MODE')!
   }

   getAppPort(): number {
      return this.configService.get<number>('NEST_APP_PORT')!
   }

   getPostgresCredentials() {
      return {
         POSTGRES_USER: this.configService.get<string>('POSTGRES_USER'),
         POSTGRES_PASSWORD: this.configService.get<string>('POSTGRES_PASSWORD'),
         POSTGRES_DB: this.configService.get<string>('POSTGRES_DB'),
         POSTGRES_HOST:
            this.getAppMode() === 'development' ? 'localhost' : this.configService.get<string>('POSTGRES_HOST'),
         POSTGRES_PORT: this.configService.get<number>('POSTGRES_PORT'),
      }
   }

   getRedisCredentials() {
      return {
         REDIS_USERNAME: this.configService.get<string>('REDIS_USERNAME'),
         REDIS_PASSWORD: this.configService.get<string>('REDIS_PASSWORD'),
         REDIS_HOST: this.getAppMode() === 'development' ? 'localhost' : this.configService.get<string>('REDIS_HOST'),
         REDIS_PORT: this.configService.get<number>('REDIS_PORT'),
         REDIS_DB_NUM: this.configService.get<number>('REDIS_DB_NUM'),
      }
   }

   getMongoCredentials() {
      return {
         MONGO_INITDB_ROOT_USERNAME: this.configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
         MONGO_INITDB_ROOT_PASSWORD: this.configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
         MONGO_INITDB_DATABASE: this.configService.get<string>('MONGO_INITDB_DATABASE'),
         MONGO_HOST: this.getAppMode() === 'development' ? 'localhost' : this.configService.get<string>('MONGO_HOST'),
         MONGO_PORT: this.configService.get<number>('MONGO_PORT'),
      }
   }
}
