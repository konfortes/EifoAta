(function() {
    var app = angular.module("EifoAta");
    app.constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest'
        })
        .constant('API_METHODS', {
            loginUser         : '/api/login/loginUser',
            getUsers          : '/api/users',
            getUser           : '/api/users',
            updateUser        : '/api/users',
            createUser        : '/api/users',
            //saveUser          : '/api/users',
            getLayer          : '/api/layers',
            getCurrentWeather : '/api/weather/current'
        });
}());