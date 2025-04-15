import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common'
import { IsString, validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

interface IUserForRegistration {
   username: string
   email: string
   password: string
   tel: string
}

class UserForRegistration implements IUserForRegistration {
   @IsString()
   username: string

   @IsString()
   email: string

   @IsString()
   password: string

   @IsString()
   tel: string
}

@Injectable()
export class UserValidationPipe implements PipeTransform {
   async transform(value: IUserForRegistration) {
      const user = plainToClass(UserForRegistration, value)
      const errors = await validate(user)

      if (errors.length > 0) {
         throw new BadRequestException(errors.toString())
      }

      return value
   }
}
