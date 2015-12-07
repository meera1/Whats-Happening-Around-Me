(function(){

    angular
        .module("eventapp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService)
    {
        console.log("Inside login controller");



        $scope.login = function (user)
        {
            var txtUserName = $("#username").val();
            var txtPassword = $("#password").val();

            console.log("username is: " + txtUserName + " password is : "  + txtPassword);

            console.log(user);
            if(txtUserName.trim().length!=0 && txtPassword.trim().length!=0){
                if (user != undefined) {
                    UserService.loginUser(user, function (user) {
                        console.log(user + " from login controller");
                        if (user != null) {
                            $rootScope.currentUser = user;
                            //console.log("user from login controller " + $rootScope.currentUser);
                            //$location.url('/profile'+user.username); // work on this and its routing in config.js
                            $location.url('/home');
                        }
                        else {
                            alert("User does not exist!");
                        }
                    },function(error){

                        alert("User does not exist!")
                    });
                }
            }else{
                alert("username and password be blank!")
            }
        }
    }
})();

