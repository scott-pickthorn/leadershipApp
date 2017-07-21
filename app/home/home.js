'use strict';

angular.module('myApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'home'
    });
  }])

  .controller('home', ['$scope', '$cookies', function ($scope, $cookies) {
    $scope.username = $cookies.get('username');
  }]);