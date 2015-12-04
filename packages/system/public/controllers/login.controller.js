(function(){

    angular
        .module("eventapp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService)
    {

        console.log("Inside login controller");

        $scope.login = function (user)
        {
            console.log(user);
            UserService.loginUser(user, function(user)
            {
                console.log(user + " from login controller");
                if(user != null)
                {
                    $rootScope.currentUser = user;
                    //console.log("user from login contorller " + $rootScope.currentUser);
                    //$location.url('/profile'+user.username); // work on this and its routing in config.js
                    $location.url('/search');
                }
                else
                    {
                        alert("User not found");
                    }

            });
        }



    }

})();

