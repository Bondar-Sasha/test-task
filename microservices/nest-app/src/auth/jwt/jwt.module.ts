import { Module } from '@nestjs/common'
import { JwtModule as ExternalJwtModule } from '@nestjs/jwt'

import { EnvService } from '@cfg'
import { TokensService } from './tokens/tokens.service'

@Module({
   imports: [
      ExternalJwtModule.registerAsync({
         useFactory: (envService: EnvService) => ({ secret: envService.getJwtSecret() }),
         inject: [EnvService],
      }),
   ],
   providers: [TokensService],
   exports: [TokensService],
})
export class JwtModule {}
