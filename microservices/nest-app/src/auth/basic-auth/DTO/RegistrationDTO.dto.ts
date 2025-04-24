import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { AuthTypes } from '@test_task/types'
import { Expose } from 'class-transformer'

export class LocalRegistrationRequest implements AuthTypes.LocalRegistrationRequest {
   @ApiProperty({ required: false, description: 'Phone number' })
   @IsOptional()
   @Expose()
   @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
   tel?: string

   @ApiProperty({ required: false, description: 'Unique username' })
   @IsOptional()
   @Expose()
   @MinLength(6, { message: 'Username must be more than 6 characters' })
   @MaxLength(15, { message: 'Username must be less than 15 characters' })
   username?: string

   @ApiProperty({ description: 'Strong password' })
   @IsString()
   @Expose()
   @MinLength(6, { message: 'Password must be more than 6 characters' })
   @MaxLength(15, { message: 'Password must be less than 15 characters' })
   password: string

   @ApiProperty({ description: 'Your email' })
   @IsEmail()
   @Expose()
   email: string
}
