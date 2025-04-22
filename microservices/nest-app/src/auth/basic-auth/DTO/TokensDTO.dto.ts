import { AuthTypes } from '@test_task/types'
import { IsString } from 'class-validator'

export class TokensDto implements AuthTypes.Tokens {
   @IsString()
   access_token: string
   @IsString()
   refresh_token: string
}
