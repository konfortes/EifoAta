(function() {
    var app = angular.module("EifoAta");
    app.factory("Sockets", function($rootScope) {
        var SocketsService = {};
        var socket = io.connect();

        SocketsService.on = function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        };
        SocketsService.emit = function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        };

        return SocketsService;
    });
}());