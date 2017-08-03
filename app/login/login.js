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
    var loggedIn = $cookies.get('connect.sid');
    if (loggedIn === 'success') {
      $location.path('/home');
    }
    $scope.submit = function () {
      $http.post('/api/auth/login', { 'username': $scope.username, 'password': $scope.password })
        .then(function (res) {
          console.log(res);
          $cookies.put('session', 'success');
          $cookies.put('username', $scope.username);
          if(res.data.access === 'basic'){
          $location.path('/home');
        }
        if(res.data.access === 'admin'){
          $location.path('/admin/home');
        }
        }, function (err) {
          $scope.username = '';
          $scope.password = '';
          console.log(err);
        });
    };

  }]);