(function(){

    angular
        .module("eventapp")
        .factory("DetailsService", DetailsService);

    function DetailsService($http, $q, $rootScope){

        var api = {
                searchById: searchById,
                addLikeForEvent: addLikeForEvent,
                addCommentForEvent: addCommentForEvent
        }

        return api;

        function searchById(id, callback){

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/events/"+id+"/?token=" + $rootScope.currentApiKey;

            $http.get(url)
               .success(function(response){
                    console.log(response);
                    deferred.resolve(response);
            })
            .error(function(error){

                console.log("error inside details service at searchbyId call" + error);
                deferred.reject(error);

            });

            return deferred.promise;
        }

        function addLikeForEvent(eventId, callback){

            var deferred = $q.defer();

            $http.post("/api/wham/eventapp/user/123/event/"+eventId+"/like")
                .success(function(response){
                    console.log("details service here");
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function addCommentForEvent(eventId, comment, callback){

            var deferred = $q.defer();

            console.log("here");

            $http.post("/api/wham/eventapp/user/123/event/"+eventId+"/comment/"+comment)
                .success(function(response){
                    console.log("details service here");
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

    }

})();