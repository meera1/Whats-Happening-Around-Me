(function(){

    angular
        .module("eventapp")
        .controller("HomeController", HomeController);

    function HomeController($scope){

        console.log("Inside Home controller");

        $scope.home = home;

        function home(){


        }

    }

})();

