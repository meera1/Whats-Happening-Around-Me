(function(){

    angular
        .module("eventapp")
        .config(Configure);

    function Configure($routeProvider){

        console.log("inside config.js");

        $routeProvider
            .when("/home",{
                            templateUrl: "views/home.html",
                            controller: "HomeController",
                            controllerAs: "homeModel"
            })
            .when("/search",{
                            templateUrl: "views/search.html",
                            controller: "SearchController",
                            controllerAs: "model"
                        })
            .when("/details/:id",{
                            templateUrl: "views/details.html",
                            controller: "DetailsController",
                            controllerAs: "detailsModel"
                        })
            .when("/login",{
                            templateUrl: "views/login.html",
                            controller: "LoginController"
                        })
            .when("/profile",{
                            templateUrl: "views/profile.html",
                            controller: "ProfileController"
                        })
            .when("/signup",{
                            templateUrl: "views/signup.html",
                            controller: "SignupController"
                        })
            .otherwise({
                redirectTo: "/search"
            });
    }

})();