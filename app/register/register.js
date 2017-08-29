'use strict';

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'register'
        });
    }])

    .controller('register', ['$http', '$scope', '$cookies', '$location', function ($http, $scope, $cookies, $location) {
        $scope.username = '';
        $scope.password = '';
        $scope.submit = function () {
            if ($scope.username === '' || $scope.password === '') {
                return;
            }
            $http.post('/api/auth/register', { 'username': $scope.username, 'password': $scope.password }).then(function (res) {
                console.log(res);
                $location.path('/home');
            }, function (err) {
                console.log(err);
            });
        };
    }]);