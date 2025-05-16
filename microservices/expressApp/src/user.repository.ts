import { AuthPostgres } from '@test_task/shared/types'
import { prismaClient } from '.'

type UserSearchingCondition =
   | {
        id: number
     }
   | {
        email: string
     }
   | {
        username?: string
     }

class UserRepository {
   getUser(condition: UserSearchingCondition) {
      return prismaClient.user.findFirst({ where: condition })
   }
   createUser(user: AuthPostgres.MakeUserCredsSnapshot) {
      return prismaClient.user.create({ data: user })
   }
   updateUser(id: number, user: AuthPostgres.UpdateUserCredsSnapshot) {
      return prismaClient.user.update({ where: { id }, data: user })
   }
   usersSoftDeleteTrigger() {
      return prismaClient.$executeRaw`SELECT clean_deleted_users();`
   }
}

export default new UserRepository()
