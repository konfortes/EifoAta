// a singleton object, using the service style
(function() {
    var app = angular.module("EifoAta");
    app.service('Session', function() {
        this.create = function(sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function() {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
        return this;
    })
}());