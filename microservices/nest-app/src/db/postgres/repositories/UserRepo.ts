import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { Postgres } from '@test_task/types'
import { User } from '../entities'

@Injectable()
export class UserRepository extends Repository<Postgres.UserSnapshot> {
   constructor(
      @InjectRepository(User) private readonly userRepository: Repository<Postgres.UserSnapshot>,
      @InjectDataSource()
      private readonly dataSource: DataSource,
   ) {
      super(userRepository.target, userRepository.manager, userRepository.queryRunner)
   }
   async isEmailAndUsernameUnique(email: string, username?: string) {
      if (!username) {
         const res = await this.getSnapshotByEmail(email)
         return !res
      }
      return this.dataSource.transaction(async manager => {
         const [emailUnique, usernameUnique] = await Promise.all([
            manager.findOne(User, { where: { email } }),
            manager.findOne(User, { where: { username } }),
         ])
         return !emailUnique && !usernameUnique
      })
   }
   saveSnapshot(user: Postgres.MakeUserSnapshot) {
      return this.save(user)
   }
   getSnapshot(id: number) {
      return this.findOneBy({ id })
   }
   getSnapshotByEmail(email: string) {
      return this.findOneBy({ email })
   }
   rewriteRefreshToken(id: number, refreshToken: string | null) {
      return this.update(id, { refresh_token: refreshToken })
   }

   rewriteIsVerifiedEmail(id: number, isVerified: boolean) {
      return this.update(id, { is_verified_email: isVerified })
   }
}
