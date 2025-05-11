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
    interface DeleteUserRequest {
        id: number;
        soft_delete_date: Date;
    }
}
