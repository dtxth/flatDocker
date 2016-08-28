'use strict';

// Declare app level module which depends on views, and components
angular.module('flatDocker', [
  'ngRoute',
  'angular-clipboard',
  'angularFileUpload',
  'ngTagsInput',
  'flatDocker.search',
  'flatDocker.push'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/search'});
}]);
