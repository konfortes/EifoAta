(function() {
    var app = angular.module("EifoAta");
    var ApplicationController = function($scope, USER_ROLES, Auth, $modal, Sockets) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = Auth.isAuthorized;
        
        $scope.newMessagesCount = 0;
        $scope.messages = [];
        var isModalInstanceOpen = false;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };
        
        $scope.openChat = function() {
            $scope.newMessagesCount = 0;
            isModalInstanceOpen = true;
            var modalInstance = $modal.open({
                templateUrl: 'partials/chat.html',
                controller: 'ChatController',
                size: 'lg',
                resolve: {
                    userName: function() {
                        return $scope.currentUser.userName;
                    },
                    unreadMessages : function(){
                        return $scope.messages;
                    }
                }
            });

            modalInstance.result.then(function(success) {
                if (success) {
                    // modal closed
                    isModalInstanceOpen = false;
                }
            }, function() {
                // modal dismissed
                isModalInstanceOpen = false;
            });
        };
        
        Sockets.on('message', function(msg) {
            // understand why it doesn't work without the $scope.$apply
/*            $scope.$apply(function(){
                $scope.$broadcast('message', msg);
            });*/
            
            $scope.messages.push(msg);
            
            if(isModalInstanceOpen === false){
                $scope.newMessagesCount++;
            }
        });
    };
    app.controller("ApplicationController", ApplicationController);
}());