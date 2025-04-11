import { Injectable, NotFoundException } from '@nestjs/common'

type AppMode = 'development' | 'production'

const [POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT] = [
   process.env.POSTGRES_USER,
   process.env.POSTGRES_PASSWORD,
   process.env.POSTGRES_DB,
   process.env.POSTGRES_HOST,
   process.env.POSTGRES_PORT,
]

const [REDIS_HOST, REDIS_USER, REDIS_PORT, REDIS_PASSWORD, REDIS_DB_NUM] = [
   process.env.REDIS_HOST,
   process.env.REDIS_USER,
   process.env.REDIS_PORT,
   process.env.REDIS_PASSWORD,
   process.env.REDIS_DB_NUM,
]

const [MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE, MONGO_HOST, MONGO_PORT] = [
   process.env.MONGO_INITDB_ROOT_USERNAME,
   process.env.MONGO_INITDB_ROOT_PASSWORD,
   process.env.MONGO_INITDB_DATABASE,
   process.env.MONGO_HOST,
   process.env.MONGO_PORT,
]

@Injectable()
export class EnvService {
   getAppMode(): AppMode {
      const APP_MODE = process.env.APP_MODE as AppMode

      if (!APP_MODE) {
         throw new NotFoundException('APP_MODE is not defined')
      }
      return APP_MODE
   }

   getAppPort(): number {
      const APP_PORT = process.env.NEST_APP_PORT

      if (!Number.isInteger(Number(APP_PORT))) {
         throw new NotFoundException('APP_PORT is not a number')
      }

      return Number(APP_PORT)
   }
   getPostgresCredentials() {
      if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB || !POSTGRES_HOST || !POSTGRES_PORT) {
         throw new NotFoundException('POSTGRES credentials are not defined')
      }
      if (!Number.isInteger(Number(POSTGRES_PORT))) {
         throw new NotFoundException('POSTGRES_PORT is not a number')
      }

      return {
         POSTGRES_USER,
         POSTGRES_PASSWORD,
         POSTGRES_DB,
         POSTGRES_HOST,
         POSTGRES_PORT: Number(POSTGRES_PORT),
      }
   }
   getRedisCredentials() {
      if (!REDIS_HOST || !REDIS_USER || !REDIS_PORT || !REDIS_PASSWORD || !REDIS_DB_NUM) {
         throw new NotFoundException('REDIS credentials are not defined')
      }
      if (!Number.isInteger(Number(REDIS_PORT)) || !Number.isInteger(Number(REDIS_DB_NUM))) {
         throw new NotFoundException('REDIS_PORT or REDIS_DB_NUM is not a number')
      }

      return {
         REDIS_HOST,
         REDIS_USER,
         REDIS_PASSWORD,
         REDIS_PORT: Number(REDIS_PORT),
         REDIS_DB_NUM: Number(REDIS_DB_NUM),
      }
   }
   getMongoCredentials() {
      if (
         !MONGO_INITDB_ROOT_USERNAME ||
         !MONGO_INITDB_ROOT_PASSWORD ||
         !MONGO_INITDB_DATABASE ||
         !MONGO_HOST ||
         !MONGO_PORT
      ) {
         throw new NotFoundException('MONGO credentials are not defined')
      }
      if (!Number.isInteger(Number(MONGO_PORT))) {
         throw new NotFoundException('MONGO_PORT is not a number')
      }

      return {
         MONGO_INITDB_ROOT_USERNAME,
         MONGO_INITDB_ROOT_PASSWORD,
         MONGO_INITDB_DATABASE,
         MONGO_HOST,
         MONGO_PORT: Number(MONGO_PORT),
      }
   }
}
