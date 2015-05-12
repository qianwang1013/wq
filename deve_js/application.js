'use strict';
var wqian = angular.module('wqian',['ngRoute']);

wqian.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'core.html',
        controller: 'Home'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
