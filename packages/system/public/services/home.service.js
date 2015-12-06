(function () {

    angular
        .module("eventapp")
        .factory("HomeService", HomeService);

    function HomeService($http, $q) {

        var api = {
            getCategories: getCategories,
            insertCategories: insertCategories,
            retrieveCategories: retrieveCategories
        }

        return api;

        function getCategories() {
            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");
            var deferred = $q.defer();

            var url = "https://www.eventbriteapi.com/v3/categories/?token=LOGWBWOABJJTLQZDQI2A";

            $http({
                url: url,
                responseType: "json"
            }).success(function (response) {
                deferred.resolve(response);
            })

            return deferred.promise;
        }

        function insertCategories(categories, callback) {
            var deferred = $q.defer();

            for (var i = 0, len = categories.length; i < len; i++) {
                var id = categories[i].id;
                var name = categories[i].name;

                $http.post("/api/wham/eventapp/category/" + id + "/" + name)
                    .success(function (response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        //function retrieveCategories(categories, callback) {
        //    var deferred = $q.defer();
        //    console.log("inside home serivce");
        //    $http.get("/api/wham/eventapp/categories", categories)
        //        .success(function (response) {
        //            console.log(response);
        //            deferred.resolve(callback);
        //        });
        //    return deferred.promise;
        //}

        function retrieveCategories(callback) {
            $http
                .get("/api/wham/eventapp/categories")
                .success(callback);
        }
    }

})();