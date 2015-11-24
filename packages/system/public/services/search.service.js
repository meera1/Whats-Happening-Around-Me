(function(){

    angular
        .module("eventapp")
        .factory("SearchService", SearchService);

    function SearchService($http){

        var api = {
                searchEventByNameAndLocation: searchEventByNameAndLocation
        }

        return api;

        function searchEventByNameAndLocation(eventName, eventLocation, within, callback){
            if(eventName == undefined) eventName = "";
            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            //var url = "https://www.eventbriteapi.com/v3/events/search/?token=WMM76DC53N75L2J5T32V&location.address=boston,ma";
            var url = "http://api.eventful.com/json/events/search?app_key=rjZLWfCmWpqWjhPd&keywords=" + eventName + "&location=" + eventLocation + "&date=Future&within=" + within + "&callback=JSON_CALLBACK";

            $http({
                 method: "JSONP",
                 url: url,
                 responseType: "json"
                }).success(function(response){
                    console.log(response);
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

    }

})();