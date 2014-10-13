(function() {
  var app = angular.module("EifoAta");
  var ChatController = function($scope, Sockets, $modalInstance, userName, unreadMessages) {
    $scope.messages = [];
    $scope.connectedUsers = [];
    $scope.message = {
      userName: userName,
      text: ''
    };
    $scope.messages.push.apply($scope.messages, unreadMessages);


    Sockets.on('message', function(msg) {
      $scope.messages.push(msg);
    });

    $scope.sendMessage = function(msg) {
      Sockets.emit('message', msg);
      $scope.message.text = '';
    };
  };
  app.controller("ChatController", ChatController);
}());