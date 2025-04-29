import { Request } from 'express'
import { AuthTypes } from '@test_task/shared/types'
import { AuthenticateOptions } from 'passport'

export interface ServiceAuthOptions extends AuthenticateOptions {
   callbackURL?: string
}

export interface AuthenticatedRequest extends Request {
   tokenData: AuthTypes.TokensCreatingPayload
   refresh_token: string
}

export interface RedirectResponse {
   url: string
   statusCode: number
}
