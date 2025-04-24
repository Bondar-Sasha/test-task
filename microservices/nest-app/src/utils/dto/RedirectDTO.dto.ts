import { HttpRedirectResponse } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class RedirectDto implements HttpRedirectResponse {
   @ApiProperty({ description: 'Redirect url' })
   @Expose()
   @IsString()
   url: string

   @ApiProperty({ description: 'Status code for redirect' })
   @IsOptional()
   @Expose()
   @IsNumber()
   statusCode: HttpRedirectResponse['statusCode']
}
