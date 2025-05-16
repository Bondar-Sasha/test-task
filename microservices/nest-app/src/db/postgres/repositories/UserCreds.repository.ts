import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities'
import { AuthPostgres } from '@test_task/shared/types'

@Injectable()
export class UserCredsRepository extends Repository<AuthPostgres.UserCredsSnapshot> {
   constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
      super(userRepository.target, userRepository.manager, userRepository.queryRunner)
   }

   async getUser(id: number) {
      const res = await this.userRepository.findOne({
         where: { id },
         select: ['id', 'email', 'role', 'tel', 'username'],
      })
      console.log(res)
      if (!res) return null
      return { ...res, username: res.username || res.email }
   }
}
