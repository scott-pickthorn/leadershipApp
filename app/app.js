'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'angular-jwt',
  'myApp.login',
  'myApp.home',
  'myApp.register',
  'myApp.version',
  'myApp.admin',
  'myApp.assignments',
  'myApp.profileService'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
      templateUrl: 'login/login.html',
      controller: 'login'
    });
  }]).
  config(['$httpProvider','jwtOptionsProvider', function($httpProvider,jwtOptionsProvider){
    jwtOptionsProvider.config({
      unauthenticatedRedirectPath: '/login'
    });
  }])
  .controller('mainCtrl', ['$rootScope','$scope','$cookies','profileService','$location', function($rootScope,$scope, $cookies, profileService, $location){
    var username = profileService.getProfile()
    $rootScope.loggedIn = false
    if(username === undefined){
      $rootScope.loggedIn = false;      
    }
    else{
      $rootScope.loggedIn = true;
    }
    $scope.signout = function(){
      $cookies.remove('token');
      $rootScope.loggedIn = false;
      profileService.clearProfile();
      $location.path('/login');
    }
  }])
