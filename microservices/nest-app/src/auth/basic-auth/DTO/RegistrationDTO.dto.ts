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

export class LocalRegistrationRequest implements AuthTypes.LocalRegistrationRequest {
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

export class LocalRegistrationResponse implements AuthTypes.LocalRegistrationResponse {
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
}
