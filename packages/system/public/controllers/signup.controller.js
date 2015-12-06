(function(){

    angular
        .module("eventapp")
        .controller("SignupController", SignupController);

    function SignupController($scope, $location, $rootScope, UserService)
    {

        console.log("Inside Signup controller");

        $scope.signup = function (user)
        {
            UserService.createUser(user, function(user)
            {
                console.log(user + "from user service controller    ");
                if(user != null)
                {
                    $rootScope.currentUser = user;
                    console.log("user from signup contorller " + $rootScope.currentUser);
                    //$location.url('/profile'+user.username); // work on this and its routing in config.js
                    $location.url('/profile/'+user.username);
                }
                else
                    {
                        alert("User Already Exists. Please use a unique username and email!");
                    }

            });
        }
            //console.log(user);


    }

})();

