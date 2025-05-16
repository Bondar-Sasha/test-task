  export const AppRoutes = {
    backendPrefix: '/api',
    authRoutes: {
      prefix: '/auth',
      logoutRoute: '/logout',
      localRegistrationRoute: '/local/registration',
      localLoginRoute: '/local/login',
      tokensValidationAndRefreshingRoute: '/tokensValidationAndRefreshing',
      confirmEmailRoute: (UrlForCode?: string | number) => `/confirmEmail/${UrlForCode || ':urlForCode'}`,
      resendCodeRoute: (UrlForCode?: string | number) => `/resendCode/${UrlForCode || ':urlForCode'}`,

      githubRegisterRoute: '/github/registration',
      githubLoginRoute: '/github/login',
      githubCallbackRoute: '/github/callback',

      googleCallbackRoute: '/google/callback',
      googleRegisterRoute: '/google/registration',
      googleLoginRoute: '/google/login',
      
    },
    userProfileRoutes:{
      prefix: '/user-profile',
      getRoute: (id?: string | number) => `/get/${id || ':id'}`,
      deleteTriggerRoute: '/delete/trigger',
      updateRoute: '/update',
      deleteRoute: '/delete',
    }
   }
  

