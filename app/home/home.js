'use strict';

angular.module('myApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'home'
    });
  }])

  .controller('home', ['jwtHelper', '$location', '$http', '$scope', '$cookies', 'profileService', function (jwtHelper, $location, $http, $scope, $cookies, profileService) {
    $scope.username = profileService.getUsername();
    var profile = profileService.getProfile();
    console.log($scope.username)
    if ($scope.username === undefined) {
      $location.path('/login');
    }
    console.log(profile);
    if (profile) {
      $scope.admin = true;
    }
    else {
      $scope.admin = false;
    }
  }]);