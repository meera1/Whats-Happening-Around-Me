(function(){

    angular
        .module("eventapp")
        .controller("SignupController", SignupController);

    function SignupController($scope){

        console.log("Inside Signup controller");

        $scope.signup = signup;

        function signup(){


        }

    }

})();

