import { Module } from '@nestjs/common'

import { GoogleAuthController } from './google-auth/google-auth.controller'
import { GoogleAuthService } from './google-auth/google-auth/google-auth.strategy'
import { PostgresModule } from 'db/postgres/postgres.module'
import { JwtModule } from 'auth/jwt/jwt.module'

@Module({
   imports: [PostgresModule, JwtModule],
   controllers: [GoogleAuthController],
   providers: [GoogleAuthService],
})
export class GoogleModule {}
