import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'
import { Postgres } from '@test_task/shared/types'
export enum Role {
   USER = 'user',
   ADMIN = 'admin',
}

export enum Provider {
   GOOGLE = 'google',
   GITHUB = 'github',
   LOCAL = 'local',
}

@Entity('user')
@Unique(['email'])
@Unique(['tel'])
@Unique(['username'])
export class UserEntity implements Postgres.UserSnapshot {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 255 })
   email: string

   @Column({
      type: 'enum',
      enum: Role,
      default: Role.USER,
   })
   role: Role

   @Column({
      type: 'enum',
      enum: Provider,
      default: Provider.LOCAL,
   })
   provider: Provider

   @Column({ type: 'boolean', default: false })
   is_verified_email: boolean

   @Column({ type: 'varchar', length: 20, nullable: true })
   tel?: string

   @Column({ type: 'varchar', length: 255, nullable: true })
   refresh_token?: string

   @Column({ type: 'varchar', length: 50, nullable: true })
   username?: string

   @Column({ type: 'varchar', length: 255, nullable: true })
   password?: string
}
