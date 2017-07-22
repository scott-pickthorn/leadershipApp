'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'login'
    });
  }])

  .controller('login', ['$http', '$scope', '$location', '$cookies', function ($http, $scope, $location, $cookies) {
    $scope.username = '';
    $scope.password = '';
    var loggedIn = $cookies.get('session');
    if (loggedIn === 'success') {
      $location.path('/main');
    }
    $scope.submit = function () {
      $http.post('/login', { 'username': $scope.username, 'password': $scope.password })
        .then(function (res) {
          console.log(res);
          $cookies.put('session', 'success');
          $cookies.put('username', $scope.username);
          $location.path('/home');
        }, function (err) {
          $scope.username = '';
          $scope.password = '';
          console.log(err);
        });
    };

  }]);