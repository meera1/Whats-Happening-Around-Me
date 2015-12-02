(function(){

    angular
        .module("eventapp")
        .factory("SearchService", SearchService);

    function SearchService($http){

        var api = {
                searchEventByNameAndLocation: searchEventByNameAndLocation,
                getAllVenues: getAllVenues
        }

        return api;

        function searchEventByNameAndLocation(eventName, eventLocation, callback){

            if(eventName == undefined) eventName = "";

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/events/search/?token=WMM76DC53N75L2J5T32V&"+eventLocation;
            console.log("Fetching data from: " + url);
             $http.get(url)
                   .success(function(response){
                        console.log(response);
                        deferred.resolve(response);
                   })
                   .finally(function(){
                        console.log("inside finally for first api call");

                   });

            return deferred.promise;
        }


        function getAllVenues(venue_id){

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/venues/"+venue_id+"/?token=WMM76DC53N75L2J5T32V";

             $http.get(url)
                .success(function(response){
                                    console.log(response);
                                    deferred.resolve(response);
                })
                .finally(function(){
                    console.log("inside finally for second api call");

                });

             return deferred.promise;

        }
    }

})();