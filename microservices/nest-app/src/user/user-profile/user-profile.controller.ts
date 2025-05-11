import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { AppRoutes } from '@test_task/shared/routes'
import { UserCredsRepository } from '../../db/postgres/repositories'

const { prefix, getRoute } = AppRoutes.userProfileRoutes()

@Controller(prefix)
export class UserProfileController {
   constructor(private readonly userProfileService: UserCredsRepository) {}

   @Get(getRoute())
   async getHello(@Param('id', ParseIntPipe) id: number) {
      return await this.userProfileService.getUser(id)
   }
}
