(function() {
    var app = angular.module("EifoAta");
    var UsersController = function($scope, API, $modal) {
        refreshGrid();

        $scope.editUser = function(user) {
            $scope.selectedUser = user;
            var modalInstance = $modal.open({
                templateUrl: 'partials/user.html',
                controller: 'UserController',
                size: 'lg',
                resolve: {
                    userName: function() {
                        return $scope.selectedUser.userName;
                    }
                }
            });

            modalInstance.result.then(function(success) {
                if (success) {
                    refreshGrid();
                }
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function refreshGrid() {
            API.getUsers().then(function(res) {
                $scope.users = res.data.users;
            });
        }
    };
    app.controller("UsersController", UsersController);
}());