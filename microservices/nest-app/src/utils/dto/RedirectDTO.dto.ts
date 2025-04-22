import { HttpRedirectResponse } from '@nestjs/common'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class RedirectDto implements HttpRedirectResponse {
   @IsString()
   url: string

   @IsOptional()
   @IsNumber()
   statusCode: HttpRedirectResponse['statusCode']
}
