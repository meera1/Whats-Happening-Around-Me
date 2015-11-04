(function(){

    angular
        .module("eventapp")
        .config(Configure);

    function Configure($routeProvider){

        console.log("inside config.js");

        $routeProvider
            .when("/search",{
                            templateUrl: "views/search.html",
                            controller: "SearchController"
                        })
            .when("/details/:id",{
                            templateUrl: "views/details.html",
                            controller: "DetailsController"
                        })
            .otherwise({
                redirectTo: "/search"
            });
    }

})();