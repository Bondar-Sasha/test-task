import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Postgres } from '@test_task/types'
import { User } from '../entities'

@Injectable()
export class UserRepository extends Repository<Postgres.UserSnapshot> {
   constructor(@InjectRepository(User) private readonly userRepository: Repository<Postgres.UserSnapshot>) {
      super(userRepository.target, userRepository.manager, userRepository.queryRunner)
   }
   makeSnapshot(user: Postgres.UserSnapshot) {
      return this.create(user)
   }
   getSnapshot(id: number) {
      return this.findOneBy({ id })
   }
   getSnapshotByEmail(email: string) {
      return this.findOneBy({ email })
   }
   rewriteRefreshToken(id: number, refreshToken: string) {
      return this.update(id, { refresh_token: refreshToken })
   }
   rewriteIsVerifiedEmail(id: number, isVerified: boolean) {
      return this.update(id, { is_verified_email: isVerified })
   }
}
