'use strict';

angular.module('myApp.main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/app', {
            templateUrl: 'home/app.html',
            controller: 'main'
        });
    }])

    .controller('main', ['$scope', '$cookies', function ($scope, $cookies) {
        $scope.username = $cookies.get('session');
        http.get('/validate-session?sessionid').then(function () {

        }).error()
    }]);