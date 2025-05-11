export declare namespace Postgres {
    interface UserCredsSnapshot {
        id: number;
        role: 'user' | 'admin';
        provider: 'google' | 'github' | 'local';
        is_verified_email: boolean;
        refresh_token?: string | null;
        password?: string | null;
        soft_delete_date?: Date | null;
    }
    interface MakeUserCredsSnapshot {
        role?: 'user' | 'admin';
        provider?: 'google' | 'github' | 'local';
        is_verified_email?: boolean;
        refresh_token?: string | null;
        password?: string;
        soft_delete_date?: Date;
    }
}
