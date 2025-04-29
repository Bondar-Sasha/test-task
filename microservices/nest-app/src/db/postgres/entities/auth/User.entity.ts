import { Postgres } from '@test_task/shared/types'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
export class User implements Postgres.UserSnapshot {
   @PrimaryGeneratedColumn('increment')
   id: number

   @Index()
   @Column({ unique: true })
   email: string

   @Column({ default: 'user', enum: ['user', 'admin'] })
   role: 'user' | 'admin'

   @Column({ enum: ['google', 'github', 'local'], default: 'local' })
   provider: 'google' | 'github' | 'local'

   @Column({ type: 'boolean', default: false })
   is_verified_email: boolean

   @Column({ unique: true, nullable: true })
   tel?: string

   @Column({ nullable: true })
   refresh_token?: string

   @Index()
   @Column({ unique: true, nullable: true })
   username?: string

   @Column({ nullable: true })
   password?: string
}
