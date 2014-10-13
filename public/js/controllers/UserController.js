(function() {
    var app = angular.module("EifoAta");
    var UserController = function($scope, API, $modalInstance, userName) {

        API.getUser(userName).then(function(res) {
            $scope.selectedUser = res.data.user;
        });

        $scope.updateUser = function(user) {
            API.updateUser($scope.selectedUser).then(function(res) {
                if (res.data.success) {
                    $scope.$emit('userUpdated', {});
                    $modalInstance.close(true);
                }
                else {
                    console.log('error updating user');
                }
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };
    app.controller("UserController", UserController);
}());
