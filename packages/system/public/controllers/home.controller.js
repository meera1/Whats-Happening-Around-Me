(function(){

    angular
        .module("eventapp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location){
        var username;
        console.log(" == inside HomeController");
        $scope.userName = "ameya";
        $scope.greetMsg = "Hello World ";

        $scope.testFn = function() {
            return "wham";
        };

        //$scope.isActive = function(route) {
        //    return route === $location.path();
        //};

    }

})();

