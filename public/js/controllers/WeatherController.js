(function() {
    var app = angular.module("EifoAta");
    var WeatherController = function($scope, API) {
        
        navigator.geolocation.getCurrentPosition(function(location){
            API.getCurrentWeather(location.coords.latitude, location.coords.longitude)
            .then(function(weather){
                $scope.weather = weather;
            });
        });
    };
    app.controller("WeatherController", WeatherController);
}());
