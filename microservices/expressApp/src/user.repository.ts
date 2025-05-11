import { Postgres } from '@test_task/shared/types'
import { prismaClient } from '.'

type UserSearchingCondition = { id: number }
class UserRepository {
   getUser(condition: UserSearchingCondition) {
      return prismaClient.user.findUnique({ where: condition })
   }
   createUser(user: Postgres.MakeUserCredsSnapshot) {
      return prismaClient.user.create({ data: user })
   }
   updateUser(id: number, user: Postgres.MakeUserCredsSnapshot) {
      return prismaClient.user.update({ where: { id }, data: user })
   }
   usersSoftDeleteTrigger() {
      return prismaClient.$executeRaw`SELECT clean_deleted_users();`
   }
}

export default new UserRepository()
