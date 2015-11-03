(function(){

    angular
        .module("eventapp")
        .factory("DetailsService", DetailsService);

    function DetailsService($http){

        var api = {
                searchById: searchById
        }

        return api;

        function searchById(id, callback){

            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

             var url = "https://www.eventbriteapi.com/v3/events/"+id+"/?token=WMM76DC53N75L2J5T32V";

            $http.get(url)
                .success(function(response){
                    console.log(response);
                    deferred.resolve(response);

                });

            return deferred.promise;
        }

    }

})();