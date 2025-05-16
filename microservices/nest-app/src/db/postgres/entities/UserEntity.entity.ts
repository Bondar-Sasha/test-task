import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'
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
export class UserEntity  {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 255, nullable: true })
   nickname?: string

   @Column({ type: 'timestamp', nullable: true })
   soft_delete_date?: Date

 
}
