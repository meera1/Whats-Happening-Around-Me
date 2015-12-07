(function () {

    angular
        .module("eventapp")
        .config(Configure);

    function Configure($routeProvider) {

        console.log("inside config.js");

        $routeProvider
            .when("/home", {
                templateUrl: "views/search.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedinForHome
                }
            })
            .when("/category", {
                templateUrl: "views/home.html",
                controller: "HomeController",
                controllerAs: "homeModel"
            })
            .when("/details/:id", {
                templateUrl: "views/details.html",
                controller: "DetailsController",
                controllerAs: "detailsModel",
                resolve: {
                    loggedin: checkLoggedinForDetails
                }
            })
            .when("/profile", {
                templateUrl: "views/profile.html",
                controller: "ProfileController",
                controllerAs: "profileModel",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/profile/:username", {
                templateUrl: "views/profile.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "LoginController"
            })

            .when("/signup", {
                templateUrl: "views/signup.html",
                controller: "SignupController"
            })
            .when("/reservation/:eventname", {
                templateUrl: "views/reservation.html",
                controller: "ReservationController",
                controllerAs: "reservationModel"
            })
            .when("/admin", {
                templateUrl: "views/admin.html",
                controller: "AdminController",
                controllerAs: "adminModel"
            })
            .when("/about", {
                templateUrl: "views/about.html",
                controller: "AboutController",
                controllerAs: "aboutModel"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/rest/loggedin').success(function (user) {
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

var checkLoggedinForHome = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/rest/loggedin').success(function (user) {
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        else {
            deferred.resolve();
            $location.url('/home');
        }

    });

    return deferred.promise;
};

var checkLoggedinForDetails = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/rest/loggedin').success(function (user) {
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        else {
            deferred.resolve();
            $location.url('/details');
        }

    });

    return deferred.promise;
};