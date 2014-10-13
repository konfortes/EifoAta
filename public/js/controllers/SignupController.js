(function() {
    var app = angular.module("EifoAta");
    var SignupController = function($scope, $location, API, $timeout) {

        $scope.registerUser = function(user) {
            $scope.signupForm.submitted = true;
            if ($scope.signupForm.$valid) {
                API.createUser(user).then(function(res) {
                    if (res.data.success) {
                        $scope.userCreated = true;
                        // TODO: show sucess message
                        $timeout(function() {
                            $location.url("/login");
                        }, 3000);
                    }
                });
            }
        };
    };
    app.controller("SignupController", SignupController);
}());