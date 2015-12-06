(function () {

    angular
        .module("eventapp")
        .factory("AdminService", AdminService);

    function AdminService($http, $q) {

        var api = {
            retrieveCategories: retrieveCategories
        }

        return api;

        function retrieveCategories(callback) {
            $http
                .get("/api/wham/eventapp/categories")
                .success(callback);
        }
    }

})();