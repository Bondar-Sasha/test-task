import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

import { AuthTypes } from '@test_task/types'

export class LoginRequest implements AuthTypes.LoginRequest {
   @IsOptional()
   @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
   tel?: string

   @IsOptional()
   @MinLength(6, { message: 'Username must be more than 6 characters' })
   @MaxLength(15, { message: 'Username must be less than 15 characters' })
   username?: string

   @IsString()
   @MinLength(6, { message: 'Password must be more than 6 characters' })
   @MaxLength(15, { message: 'Password must be less than 15 characters' })
   password: string

   @IsEmail()
   email: string
}
