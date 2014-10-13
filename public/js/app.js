(function() {

    var app = angular.module("EifoAta", ["ngRoute", "ui.bootstrap"]);

    app.config(function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "partials/login.html",
            controller: "LoginController"
        })
        .when("/login", {
            templateUrl: "partials/login.html",
            controller: "LoginController"
        })
         .when("/map", {
            templateUrl: "partials/map.html",
            controller: "MapController"
        })
        .when("/users", {
            templateUrl: "partials/users.html",
            controller: "UsersController"
        })
        .when("/signup", {
            templateUrl: "partials/signup.html",
            controller: "SignupController"
        })
        .when("/user/:username", {
            templateUrl: "user.html",
            controller: "UserController"
        })
        .when("/weather", {
            templateUrl: "partials/weather.html",
            controller: "WeatherController"
        })
        .when("/chatTest", {
            templateUrl: "partials/chat.html",
            controller: "ChatController"
        })
        .otherwise({
            redirectTo: "/login"
        });
    });

}());