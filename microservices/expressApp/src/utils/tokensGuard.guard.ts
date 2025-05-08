import { AuthTypes } from '@test_task/shared/types'
import { RedirectResponse } from './customTypes'

export const userWithTokensGuard = (data: AuthTypes.Tokens | RedirectResponse): data is RedirectResponse => {
   return 'statusCode' in data
}
