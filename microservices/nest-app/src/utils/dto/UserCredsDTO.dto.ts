import {
   IsBoolean,
   IsEmail,
   IsIn,
   IsInt,
   IsNumber,
   IsOptional,
   IsPhoneNumber,
   IsPositive,
   IsString,
   MaxLength,
   MinLength,
} from 'class-validator'

import { AuthTypes } from '@test_task/types'
import { Exclude } from 'class-transformer'

export class UserCredsDto implements AuthTypes.UserCreds {
   @IsNumber({ allowNaN: false, allowInfinity: false })
   @IsInt({ message: 'ID must be an integer' })
   @IsPositive({ message: 'ID must be a non-negative integer' })
   id: number

   @IsEmail()
   email: string

   @IsOptional()
   @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
   tel?: string

   @IsBoolean()
   is_verified_email: boolean

   @MinLength(6, { message: 'Username must be more than 6 characters' })
   @MaxLength(15, { message: 'Username must be less than 15 characters' })
   username: string

   @IsIn(['google', 'github', 'local'], {
      message: 'Provider must be either google, github or local',
   })
   provider: 'google' | 'github' | 'local'

   @IsIn(['user', 'admin'], {
      message: 'Role must be either user or admin',
   })
   role: 'user' | 'admin'

   @IsOptional()
   @IsString()
   accessToken?: string

   @Exclude()
   password?: string

   @Exclude()
   refresh_token?: string

   constructor(partial: Partial<AuthTypes.UserCreds & AuthTypes.Tokens>) {
      Object.assign(this, partial)
   }
}
