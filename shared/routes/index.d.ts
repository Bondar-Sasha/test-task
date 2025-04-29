export declare class AppRoutes {
    static backendPrefix: string;
    static authRoutes(): {
        prefix: string;
        logoutRoute: string;
        localRegistrationRoute: string;
        localLoginRoute: string;
        refreshTokensRoute: string;
        confirmEmailRoute: (UrlForCode?: string | number) => string;
        resendCodeRoute: string;
        githubRegisterRoute: string;
        githubLoginRoute: string;
        githubRegisterCallbackRoute: string;
        githubLoginCallbackRoute: string;
        googleRegisterRoute: string;
        googleLoginRoute: string;
        googleRegisterCallbackRoute: string;
        googleLoginCallbackRoute: string;
    };
}
