(function(){

    angular
        .module("eventapp")
        .config(Configure);

    function Configure($routeProvider){

        console.log("inside config.js");

        $routeProvider
            .when("/search",{
                            templateUrl: "search.html",
                            controller: "SearchController"
                        })
            .when("/details",{
                            templateUrl: "details.html",
                            controller: "DetailsController"
                        })
            .otherwise({
                redirectTo: "/search"
            });
    }

})();