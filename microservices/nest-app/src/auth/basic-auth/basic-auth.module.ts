import { Module } from '@nestjs/common'

import { BasicAuthController } from './basic-auth/basic-auth.controller'
import { JwtModule } from 'auth/jwt/jwt.module'
import { BasicAuthService } from './basic-auth/basic-auth/basic-auth.service'
import { RedisModule } from 'db/redis/redis.module'
import { EmailNotificationService } from 'email-notification/email-notification/email-notification.service'
import { PostgresModule } from 'db/postgres/postgres.module'

@Module({
   imports: [JwtModule, RedisModule, PostgresModule],
   controllers: [BasicAuthController],
   providers: [BasicAuthService, EmailNotificationService],
})
export class BasicAuthModule {}
