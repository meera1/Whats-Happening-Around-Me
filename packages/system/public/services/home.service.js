(function(){

    angular
        .module("eventapp")
        .factory("HomeService", HomeService);

    function HomeService($http){

        var api = {
                getCategories: getCategories
        }

        return api;

        function getCategories(){
            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/categories/?token=WMM76DC53N75L2J5T32V";

            $http({
                 url: url,
                 responseType: "json"
                }).success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

    }

})();