(function() {
    var app = angular.module("EifoAta");
    var LoginController = function($scope, $location, Auth, AUTH_EVENTS, $rootScope) {

        //if (Modernizr.localstorage) 
        
        $scope.loginUser = function(credentials) {
            if (credentials.userName && credentials.password) {
                Auth.loginUser(credentials.userName, credentials.password, $scope.rememberMe, function(res) {
                    if (res.success) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $scope.setCurrentUser(res.user);
                        $location.url("/map");
                    }
                })
            };
        };
    };
    app.controller("LoginController", LoginController);
}());