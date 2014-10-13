(function() {
    var app = angular.module("EifoAta");
    app.factory("Auth", function(Session, API) {
        var authService = {};

        authService.loginUser = function(userName, password, rememberMe, callback) {
            API.loginUser(userName, password, rememberMe).then(function(res) {
                if (res.data.success && res.data.user) {
                    Session.create(res.data.id, res.data.user._id, res.data.user.role);
                }
                callback(res.data);
            });
        };

        authService.isAuthenticated = function() {
            return !!Session.userId;
        };

        authService.isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    });
}());