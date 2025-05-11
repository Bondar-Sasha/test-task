"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
class AppRoutes {
    static backendPrefix = '/api';
    static authRoutes() {
        return {
            prefix: '/auth',
            logoutRoute: '/logout',
            localRegistrationRoute: '/local/registration',
            localLoginRoute: '/local/login',
            tokensValidationAndRefreshingRoute: '/tokensValidationAndRefreshing',
            confirmEmailRoute: (UrlForCode) => `/confirmEmail/${UrlForCode || ':urlForCode'}`,
            resendCodeRoute: (UrlForCode) => `/resendCode/${UrlForCode || ':urlForCode'}`,
            githubRegisterRoute: '/github/registration',
            githubLoginRoute: '/github/login',
            githubCallbackRoute: '/github/callback',
            googleCallbackRoute: '/google/callback',
            googleRegisterRoute: '/google/registration',
            googleLoginRoute: '/google/login',
        };
    }
    static userProfileRoutes() {
        return {
            prefix: '/user-profile',
            getRoute: (id) => `/get/${id || ':id'}`,
            deleteTriggerRoute: '/delete/trigger',
            updateRoute: '/update',
            deleteRoute: '/delete',
        };
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=index.js.map