(function () {

    angular
        .module("eventapp")
        .factory("SearchService", SearchService);

    function SearchService($http, $rootScope) {

        var api = {
            searchEventByNameAndLocation: searchEventByNameAndLocation,
            getAllVenues: getAllVenues
        }

        return api;

        function searchEventByNameAndLocation(eventName, eventLocation, preferences, pageNumber, callback){

            if (eventName == undefined) eventName = "";

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();
            var categories = preferences.join();

            var url = "https://www.eventbriteapi.com/v3/events/search/?token="+ $rootScope.currentApiKey + "&"+eventLocation + "&q=" + eventName + "&categories=" + categories + "&page=" + pageNumber;

            console.log("Fetching data from: " + url);
            $http.get(url)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                })
                .error(function(error){
                    console.log("error inside searchservice searchevent from http get ---" + error);
                    deferred.reject(error);
                })
                .finally(function () {
                    console.log("inside finally for first api call");

                });

            return deferred.promise;
        }


        function getAllVenues(venue_id) {

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/venues/"+venue_id+"/?token=" + $rootScope.currentApiKey;

            $http.get(url)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                })
                .error(function(error){
                    console.log("error from searchservice getallvenues api call" + error);
                    deferred.reject(error);
                })
                .finally(function () {
                    console.log("inside finally for second api call");

                });

            return deferred.promise;

        }
    }

})();