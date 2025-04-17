import { Module } from '@nestjs/common'

import { GoogleAuthController } from './google-auth/google-auth.controller'
import { GoogleAuthService } from './google-auth/google-auth/google-auth.strategy'

@Module({
   providers: [GoogleAuthService],
   controllers: [GoogleAuthController],
})
export class GoogleModule {}
