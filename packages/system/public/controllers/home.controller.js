(function(){

    angular
        .module("eventapp")
        .controller("HomeController", HomeController);

    function HomeController($scope){

        console.log(" == inside HomeController");
        $scope.userName = "";

        $scope.greet = greet;

        function greet(userName){
            console.log("hello " + userName);
            return "hello " + userName;
        }

    }

})();

