var env = "http://127.0.0.1:8000/"

var myApp = angular.module('loctalk', ['ngRoute']);


myApp.config(function ($routeProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        'self'
      ]);

    $routeProvider
        .when('/', {
            templateUrl: 'chat.html',
            controller: 'chatContrl'
        });


});

