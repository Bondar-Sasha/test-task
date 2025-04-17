import { Module } from '@nestjs/common'
import { GithubAuthController } from './github-auth/github-auth.controller'
import { GithubAuthService } from './github-auth/github-auth/github-auth.strategy'

@Module({
   controllers: [GithubAuthController],
   providers: [GithubAuthService],
})
export class GithubModule {}
