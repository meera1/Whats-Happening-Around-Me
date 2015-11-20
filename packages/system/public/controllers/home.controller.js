(function(){

    angular
        .module("eventapp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location){
        console.log(" == inside HomeController");

        $scope.greetMsg = "Hello, World!";

        $scope.testFn = function() {
            return "wham";
        };

        $scope.greet = function(name) {
            return "Hello, " + name + "!";
        };

    }

})();

