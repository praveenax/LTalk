var env = "http://127.0.0.1:8000/"

var myApp = angular.module('exchangerpg', ['ngRoute']);


myApp.config(function ($routeProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        'self'
      ]);

    $routeProvider
        .when('/', {
            templateUrl: 'game.html',
            controller: 'gameContrl'
        })
        .when('/play', {
            templateUrl: 'html/play.html',
            controller: 'playContrl'
        }).when('/stat', {
            templateUrl: 'html/stats.html',
            controller: 'playContrl'
        });


});

