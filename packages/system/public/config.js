(function(){

    angular
        .module("eventapp")
        .config(Configure);

    function Configure($routeProvider){

        console.log("inside config.js");

        $routeProvider
            .when("/search",{
                templateUrl: "index.html",
                controller: "IndexController as model"
            })
            .otherwise({

                redirectTo:"/search"



            });

    }

})();