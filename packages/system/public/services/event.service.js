(function(){

    angular
        .module("eventapp")
        .factory("EventService", EventService);

    function EventService($http){

        var api = {
                searchEventByNameAndLocation: searchEventByNameAndLocation
        }

        return api;

        function searchEventByNameAndLocation(eventName, eventLocation, callback){

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/events/search/?token=WMM76DC53N75L2J5T32V&location.address=boston,ma";

            $http.get(url)
                .success(function(response){
                    console.log(response);
                    deferred.resolve(response);

                });

            return deferred.promise;
        }

    }

})();