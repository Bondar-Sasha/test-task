import { Postgres } from '@test_task/shared/types'
import { prismaClient } from '.'

type UserSearchingCondition = { id: number } | { email: string } | { username: string | undefined }

class UserRepository {
   getUser(condition: UserSearchingCondition) {
      return prismaClient.user.findUnique({ where: condition })
   }
   createUser(user: Postgres.MakeUserSnapshot) {
      return prismaClient.user.create({ data: user })
   }
   updateUser(id: number, user: Partial<Postgres.MakeUserSnapshot>) {
      return prismaClient.user.update({ where: { id }, data: user })
   }
   rewriteRefreshToken(id: number, refreshToken?: string | null) {
      return prismaClient.user.update({ where: { id }, data: { refresh_token: refreshToken } })
   }
}

export default new UserRepository()
