import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvService } from '@cfg'

@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         inject: [EnvService],
         useFactory: (envService: EnvService) => {
            const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
               envService.getPostgresCredentials()

            return {
               type: 'postgres',
               name: 'postgres',
               host: POSTGRES_HOST,
               port: POSTGRES_PORT,
               username: POSTGRES_USER,
               password: POSTGRES_PASSWORD,
               database: POSTGRES_DB,
               autoLoadEntities: true,
               synchronize: envService.getAppMode() === 'development',
               logging: envService.getAppMode() === 'development',
            }
         },
      }),
      TypeOrmModule.forFeature([]),
   ],
   providers: [],
   exports: [],
})
export class PostgresModule {}
