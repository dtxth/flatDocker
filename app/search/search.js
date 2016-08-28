'use strict';

angular.module('flatDocker.search', ['ngRoute', 'angular-clipboard'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope','clipboard', 'TagsService', 'FilesService',
                          function($scope, clipboard, TagsService, FilesService) {

///////////////////////////////////////
//
// Variables Declaration
//
//////////////////////////////////////

  TagsService.init(_set_tags);
  FilesService.init(_set_files);

  $scope.tags = [];
  $scope.files = [];
  $scope.to_find = [];



///////////////////////////////////////
//
// Function Declaration
//
//////////////////////////////////////
  $scope.loadTags = loadTags;
  $scope.copy = copy;
  $scope.next = next;
  $scope.prev = prev;
  $scope.filter = filter;

///////////////////////////////////////
//
// Function Implementation
//
//////////////////////////////////////
  function filter(tags){
    console.log(tags);
    var to_transfer = [];
    angular.forEach(tags, function(tag) {
      this.push(tag['name']);
    }, to_transfer);
    FilesService.filter(to_transfer, _set_files);
  }

  function loadTags(query) {
   return TagsService.get();
  }

  function copy(path){
    // alert(path);
    clipboard.copyText(path);
  }

  function next(){
      FilesService.next();
      FilesService.init(_set_files);
      if(FilesService.get().length == 0){
        prev();
      }
  }

  function prev(){
    FilesService.prev();
    FilesService.init(_set_files);
  }

///////////////////////////////////////
//
// Callbacks
//
//////////////////////////////////////
function _set_files(data){
  $scope.files = data;
}

function _set_tags(data){
  $scope.tags = data;
}

}]);
