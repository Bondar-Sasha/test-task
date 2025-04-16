import { Global, Module } from '@nestjs/common'
import { AppRoutesService } from './app-routes/app-routes.service'

@Global()
@Module({
   providers: [AppRoutesService],
})
export class AppRoutesModule {}
