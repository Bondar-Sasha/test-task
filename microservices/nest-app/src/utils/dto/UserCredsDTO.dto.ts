import {
   IsEmail,
   IsIn,
   IsInt,
   IsNumber,
   IsOptional,
   IsPhoneNumber,
   IsPositive,
   MaxLength,
   MinLength,
} from 'class-validator'
import { Expose } from 'class-transformer'
import { AuthTypes } from '@test_task/shared/types'
import { ApiProperty } from '@nestjs/swagger'

export class UserCredsDto implements AuthTypes.UserCreds {
   @ApiProperty({ description: 'User id' })
   @Expose()
   @IsNumber({ allowNaN: false, allowInfinity: false })
   @IsInt({ message: 'ID must be an integer' })
   @IsPositive({ message: 'ID must be a non-negative integer' })
   id: number

   @ApiProperty({ description: 'User email' })
   @Expose()
   @IsEmail()
   email: string

   @ApiProperty({ required: false, description: 'User phone number' })
   @Expose()
   @IsOptional()
   @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
   tel?: string

   @ApiProperty({ description: 'User username' })
   @Expose()
   @MinLength(6, { message: 'Username must be more than 6 characters' })
   @MaxLength(15, { message: 'Username must be less than 15 characters' })
   username: string

   @ApiProperty({ description: 'Registration provider', enum: ['google', 'github', 'local'] })
   @Expose()
   @IsIn(['google', 'github', 'local'], {
      message: 'Provider must be either google, github or local',
   })
   provider: 'google' | 'github' | 'local'

   @ApiProperty({ description: 'User role', enum: ['user', 'admin'] })
   @Expose()
   @IsIn(['user', 'admin'], {
      message: 'Role must be either user or admin',
   })
   role: 'user' | 'admin'

   constructor(partial: Partial<AuthTypes.UserCreds & AuthTypes.Tokens>) {
      Object.assign(this, partial)
   }
}
