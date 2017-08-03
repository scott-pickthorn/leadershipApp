'use strict';

angular.module('myApp.admin', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/admin/home', {
      templateUrl: 'admin/admin.html',
      controller: 'admin'
    });
  }])

  .controller('admin', ['$scope', '$cookies', function ($scope, $cookies) {
    $scope.username = $cookies.get('username');
  }]);