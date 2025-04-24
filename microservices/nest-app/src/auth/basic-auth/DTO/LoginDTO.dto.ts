import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { AuthTypes } from '@test_task/types'
import { Expose } from 'class-transformer'

export class LoginRequest implements AuthTypes.LoginRequest {
   @ApiProperty({ description: 'Password for your account' })
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
