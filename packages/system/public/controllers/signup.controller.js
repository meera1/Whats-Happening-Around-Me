(function () {

    angular
        .module("eventapp")
        .controller("SignupController", SignupController);

    function SignupController($scope, $location, $rootScope, UserService) {

        console.log("Inside Signup controller");

        $scope.signup = function (user) {

            if ($("#username").val().trim() != "" && $("#password").val().trim() != "" &&
                $("#fname").val().trim() != "" && $("#lname").val().trim() != "" && $("#email").val().trim() != "") {
                UserService.createUser(user, function (user) {
                    console.log(user + " | from user service controller");
                    if (user != null) {
                        $rootScope.currentUser = user;
                        console.log("user from signup contorller " + $rootScope.currentUser);
                        $location.url('/profile/' + user.username);
                    }
                    else {
                        alert("User Already Exists. Please use a unique username and email!");
                    }

                });
            }
            else {
                alert("Please ensure fields are not blank!");
            }

        }

    }

})();

