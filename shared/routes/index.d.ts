export declare class AppRoutes {
    static backendPrefix: string;
    static authRoutes(): {
        prefix: string;
        logoutRoute: string;
        localRegistrationRoute: string;
        localLoginRoute: string;
        tokensValidationAndRefreshingRoute: string;
        confirmEmailRoute: (UrlForCode?: string | number) => string;
        resendCodeRoute: (UrlForCode?: string | number) => string;
        githubRegisterRoute: string;
        githubLoginRoute: string;
        githubCallbackRoute: string;
        googleCallbackRoute: string;
        googleRegisterRoute: string;
        googleLoginRoute: string;
    };
    static userProfileRoutes(): {
        prefix: string;
        getRoute: (id?: string | number) => string;
        deleteTriggerRoute: string;
        updateRoute: string;
        deleteRoute: string;
    };
}
