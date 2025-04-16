import {
   IsEmail,
   IsInt,
   IsNotEmpty,
   IsNumber,
   IsPhoneNumber,
   IsPositive,
   IsString,
   IsUrl,
   Max,
   Min,
} from 'class-validator'
import { AuthTypes } from '@test_task/types'

export class RegistrationAttemptRequest implements AuthTypes.RegistrationAttemptRequest {
   @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
   tel: string

   @IsString()
   @Min(6, { message: 'Username must be more than 6 characters' })
   @Max(10, { message: 'Username must be less than 15 characters' })
   username: string

   @IsString()
   @Min(6, { message: 'Password must be more than 6 characters' })
   @Max(15, { message: 'Password must be less than 15 characters' })
   password: string

   @IsEmail()
   email: string
}

export class RegistrationAttemptResponse implements AuthTypes.RegistrationAttemptResponse {
   @IsUrl()
   @IsString()
   confirmEmailUrl: string
}

export class CommitRegistrationRequest implements AuthTypes.CommitRegistrationRequest {
   @IsNotEmpty()
   codeFromEmail: number
}

export class CommitRegistrationResponse implements AuthTypes.CommitRegistrationResponse {
   @IsNumber({ allowNaN: false, allowInfinity: false })
   @IsInt({ message: 'ID must be an integer' })
   @IsPositive({ message: 'ID must be a non-negative integer' })
   id: number

   @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
   tel: string

   @IsString()
   @Min(6, { message: 'Username must be more than 6 characters' })
   @Max(10, { message: 'Username must be less than 15 characters' })
   username: string

   @IsEmail()
   email: string

   @IsString()
   accessToken: string
}
