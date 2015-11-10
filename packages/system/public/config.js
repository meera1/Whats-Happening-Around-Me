(function(){

    angular
        .module("eventapp")
        .config(Configure);

    function Configure($routeProvider){

        console.log("inside config.js");

        $routeProvider
            .when("/home",{
                            templateUrl: "views/home.html",
                            controller: "HomeController"
            })
            .when("/search",{
                            templateUrl: "views/search.html",
                            controller: "SearchController"
                        })
            .when("/details/:id",{
                            templateUrl: "views/details.html",
                            controller: "DetailsController"
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