import { Postgres } from '@test_task/types'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User implements Postgres.UserSnapshot {
   @PrimaryGeneratedColumn()
   id: number
   @Column({ unique: true })
   email: string
   @Column({ default: 'user', enum: ['user', 'admin'] })
   role: 'user' | 'admin'
   @Column()
   refresh_token: string
   @Column({ enum: ['google', 'github', 'local'] })
   provider: 'google' | 'github' | 'local'
   @Column({ type: 'boolean' })
   is_verified_email: boolean
   @Column({ unique: true, nullable: true })
   tel?: string
   @Column({ unique: true, nullable: true })
   username?: string
   @Column({ nullable: true })
   password?: string
}
