'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'login'
    });
  }])

  .controller('login', ['$rootScope', '$http', '$scope', '$location', '$cookies','profileService', function ($rootScope, $http, $scope, $location, $cookies, profileService) {
    $scope.username = '';
    $scope.password = '';
    var token = $cookies.get('token');
    if(token){
    profileService.fetchProfile(token).then(function(result){
        console.log(result);
        profileService.setProfile(result.data.profile, result.data.username);
        $rootScope.loggedIn = true;
          $location.path('/home');
    }, function(err){
      console.log(err);
    });
    }
      
    $scope.submit = function () {
      $http.post('/api/auth/login', { 'username': $scope.username, 'password': $scope.password })
        .then(function (res) {
          profileService.setProfile(res.data.profile, res.data.username);
          $cookies.put('token',res.data.token);
          $rootScope.loggedIn = true;
            $location.path('/home');
        }, function (err) {
          $scope.username = '';
          $scope.password = '';
          console.log(err);
        });
    };

  }]);