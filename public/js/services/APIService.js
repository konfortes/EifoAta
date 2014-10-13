(function() {
    var app = angular.module("EifoAta");
    app.factory("API", function($http, API_METHODS) {
        var APIService = {};

        APIService.loginUser = function(userName, password, rememberMe) {
            /*var url = API_METHODS.loginUser + "?userName=" + userName + "&password=" + password;
            return $http.get(url);*/

            var url = API_METHODS.loginUser;
            return $http.post(url, {
                userName: userName,
                password: password
            });
        };

        APIService.getUsers = function() {
            var url = API_METHODS.getUsers;
            return $http.get(url);
        };

        APIService.getUser = function(userName) {
            var url = API_METHODS.getUser + "/" + userName;
            return $http.get(url);
        };

        APIService.updateUser = function(user) {
            var url = API_METHODS.updateUser;
            return $http.put(url, {
                user: user
            });
        };

        APIService.createUser = function(user) {
            var url = API_METHODS.createUser;
            return $http.post(url, {
                user: user
            });
        };

        /*APIService.saveUser = function(user) {
          var url = API_METHODS.saveUser;
          return $http.post(url, {
             user: user
          });
        };*/

        APIService.getLayer = function(layer) {
            var url = API_METHODS.getLayer + "/" + layer;
            return $http.get(url);
        };
        
        APIService.getCurrentWeather = function(latitude, longitude) {
            var url = API_METHODS.getCurrentWeather + "?latitude=" + latitude + "&longitude=" + longitude;
            return $http.get(url);
        };

        return APIService;
    });
}());