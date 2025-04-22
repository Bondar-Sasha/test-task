import { IsNumber } from 'class-validator'

import { AuthTypes } from '@test_task/types'

export class LogoutRequest implements AuthTypes.LogoutRequest {
   @IsNumber({ allowNaN: false, allowInfinity: false })
   id: number
}
