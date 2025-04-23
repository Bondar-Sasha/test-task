import { Module } from '@nestjs/common'
import { GithubAuthController } from './github-auth/github-auth.controller'
import { GithubAuthService } from './github-auth/github-auth/github-auth.strategy'
import { JwtModule } from 'auth/jwt/jwt.module'
import { PostgresModule } from 'db/postgres/postgres.module'

@Module({
   imports: [JwtModule, PostgresModule],
   controllers: [GithubAuthController],
   providers: [GithubAuthService],
})
export class GithubModule {}
