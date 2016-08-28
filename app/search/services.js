angular.module('flatDocker')
    .service('TagsService', function($http){
      var tags = [];
      return {
        init : function(_cb){
          var ajax = $http.get("/api/tags")
            .success(function(data, status){
              console.log(angular.fromJson(data));
              tags = angular.fromJson(data);
              _cb(tags);
            })
            .error(function(data,status){
              console.log("bad connection");
            });

        },

        get : function(){
          return tags;
        }

      }
    })
    .service('FilesService', function($http){
      var files = [];
      var current = 1;
      return {
        init : function(_cb){
          var ajax = $http.get("/api/files/" + current)
            .success(function(data, status){
              console.log(angular.fromJson(data));
              files = angular.fromJson(data);
              _cb(files);
            })
            .error(function(data,status){
              console.log("bad connection");
            });

        },
        filter: function(tags, _cb){
          var ajax = $http.get("/api/files?tags=" + tags)
            .success(function(data, status){
              console.log(angular.fromJson(data));
              files = angular.fromJson(data);
              _cb(files);
            })
            .error(function(data,status){
              console.log("bad connection");
            });

        },
        next: function(){
            current += 1;
        },

        prev: function(){
          if(current != 1){
            current -=1;
          }
        },

        get : function(){
          return files;
        }

      }
    });
