(function(){

    angular
        .module("eventapp")
        .factory("DetailsService", DetailsService);

    function DetailsService($http, $q, $rootScope){

        var api = {
                searchById: searchById,
                addLikeForEvent: addLikeForEvent,
                addDisLikeForEvent: addDisLikeForEvent,
                addCommentForEvent: addCommentForEvent,
                checkforlikes: checkforlikes,
                getAllEvents: getAllEvents,
                removeCommentForEvent: removeCommentForEvent
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



        function checkforlikes(username, id, callback){
            var parameters = {username: username, id: id};
            //var config = {params: parameters};
            $http.get("/rest/" + username + "/event/" + id + "/check")
            .success(callback);

        }

        function addLikeForEvent(eventId, username, callback){
            $http.post("/rest/like", { username: username, eventId: eventId })
                .success(callback);
        }

        function addDisLikeForEvent(eventId, username, callback){
            $http.post("/rest/dislike", { username: username, eventId: eventId })
                .success(callback);
        }


        function addCommentForEvent(username, eventId, comment, callback){
        	$http.post("/rest/addcomment", {username: username, eventId: eventId, comment : comment})
                            .success(callback);
        }

         function removeCommentForEvent(username, eventId, comment, callback){
             $http.post("/rest/removecomment", {username: username, eventId: eventId, comment: comment})
                            .success(callback);
         }

        function getAllEvents(eventId, callback){
            $http.get("/rest/comment/" + eventId)
                            .success(callback);
        }

    }

})();