import { Request } from 'express';
export declare namespace AuthTypes {
    interface TokensCreatingPayload {
        userId: number;
    }
    interface Tokens {
        access_token: string;
        refresh_token: string;
    }
    interface AuthenticatedRequest extends Request {
        tokenData: TokensCreatingPayload;
        refresh_token: string;
    }
    interface ValidationTokensRes {
        validation: [null | TokensCreatingPayload, null | TokensCreatingPayload];
    }
    interface UserCreds {
        id: number;
        email: string;
        role: 'user' | 'admin';
        username: string;
        provider: 'google' | 'github' | 'local';
        tel?: string;
    }
    interface LocalRegistrationRequest {
        email: string;
        password: string;
        username?: string;
        tel?: string;
    }
    interface LoginRequest {
        email: string;
        password: string;
    }
    interface ConfirmEmailRequest {
        code: number;
    }
}
