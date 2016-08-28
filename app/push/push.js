'use strict';

angular.module('flatDocker.push', ['ngRoute', 'angularFileUpload', 'angular-clipboard'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/push', {
    templateUrl: 'push/push.html',
    controller: 'PushCtrl'
  });
}])

.controller('PushCtrl', ['$scope', 'FileUploader', 'clipboard', function($scope, FileUploader, clipboard) {
    $scope.downloadFiles = [];


    var uploader = $scope.uploader = new FileUploader({
        url: '/api/files'
    });
    $scope.is_loaded = false;

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        $scope.downloadFiles.push(angular.fromJson(response));
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
        $scope.is_loaded = true;
    };

    console.info('uploader', uploader);


    ///////////////////////////////////////
    //
    // Function Declaration
    //
    //////////////////////////////////////
      $scope.copy = copy;

    ///////////////////////////////////////
    //
    // Function Implementation
    //
    //////////////////////////////////////
    function copy(){
      var text = "11";
      angular.forEach($scope.downloadFiles, function(_v){
        text.concat(_v.path, "\n");
        console.log(text);
      });
      clipboard.copyText(text);
    }




}]);
