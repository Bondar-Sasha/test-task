import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { AuthTypes } from '@test_task/types'
import { Expose } from 'class-transformer'

export class ConfirmEmailRequest implements AuthTypes.ConfirmEmailRequest {
   @ApiProperty({ description: 'Code from confirming email' })
   @Expose()
   @IsNumber({ allowNaN: false, allowInfinity: false })
   code: number
}
