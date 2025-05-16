import { AuthenticateOptions } from 'passport'

export interface ServiceAuthOptions extends AuthenticateOptions {
   callbackURL?: string
}

export interface RedirectResponse {
   url: string
   statusCode: number
}
