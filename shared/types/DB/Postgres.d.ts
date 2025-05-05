export declare namespace Postgres {
    interface IGetUserProfile {
        id: number;
        email: string;
        role: 'user' | 'admin';
        tel?: string;
        username: string;
    }
    interface UpdateUserSnapshot {
        tel: string;
        username: string;
    }
    interface UserSnapshot {
        id: number;
        email: string;
        role: 'user' | 'admin';
        provider: 'google' | 'github' | 'local';
        is_verified_email: boolean;
        refresh_token?: string | null;
        tel?: string;
        username?: string;
        password?: string;
    }
    interface MakeUserSnapshot {
        email: string;
        role?: 'user' | 'admin';
        provider?: 'google' | 'github' | 'local';
        is_verified_email?: boolean;
        refresh_token?: string;
        tel?: string;
        username?: string;
        password?: string;
    }
}
