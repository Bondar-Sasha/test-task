import { Module } from '@nestjs/common'
import { UserProfileService } from './services/user-profile/user-profile.service'
import { UserProfileController } from './user-profile/user-profile.controller'
import { PostgresModule } from 'db/postgres/postgres.module'

@Module({
   imports: [PostgresModule],
   providers: [UserProfileService],
   controllers: [UserProfileController],
})
export class UserModule {}
