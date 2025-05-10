import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './entities'
import { UserCredsRepository } from './repositories'
import { ConfigService } from '@nestjs/config'

@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (cfgService: ConfigService) => {
            const isDev = cfgService.get('APP_MODE') === 'development'

            return {
               type: 'postgres',
               url: cfgService.get('COMMON_POSTGRES_DB_URL'),
               autoLoadEntities: true,
               synchronize: isDev,
               logging: isDev,
               entities: [UserEntity],
               retryAttempts: 1,
               retryDelay: 3000,
               keepConnectionAlive: false,
            }
         },
      }),
      TypeOrmModule.forFeature([UserEntity]),
   ],
   providers: [UserCredsRepository],
   exports: [UserCredsRepository],
})
export class PostgresModule {}
