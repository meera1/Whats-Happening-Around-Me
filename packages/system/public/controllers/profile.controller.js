(function(){

    angular
        .module("eventapp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $rootScope, UserService){

        console.log("route params from profile controller "+ $routeParams["username"]);
        var username = $routeParams["username"];
        //console.log($rootScope.currentUser.username);
        $scope.username = username;
        UserService.lookupUserByUsername(username, function(user){

            $scope.user = user;
        });

        $scope.update = function(user)
        {
           UserService.updateUser(user, function(user)
               {
                   //console.log(user + "from profile controller    ");
                    $scope.user = user;
                    alert('Profile Updated');

               });
        }
    }
})();

