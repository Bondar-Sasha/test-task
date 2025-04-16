import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { GithubModule } from './github/github.module';
import { JwtModule } from './jwt/jwt.module';
import { BasicAuthModule } from './basic-auth/basic-auth.module';

@Module({
  imports: [GoogleModule, GithubModule, JwtModule, BasicAuthModule]
})
export class AuthModule {}
