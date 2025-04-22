import { IsNumber } from 'class-validator'

import { AuthTypes } from '@test_task/types'

export class ConfirmEmailRequest implements AuthTypes.ConfirmEmailRequest {
   @IsNumber({ allowNaN: false, allowInfinity: false })
   code: number
}
