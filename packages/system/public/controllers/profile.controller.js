(function(){

    angular
        .module("eventapp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $rootScope, UserService){
        var username = $rootScope.currentUser.username;
        //console.log("route params from profile controller "+ $routeParams["username"]);
        console.log("route params from profile controller "+ username);
        //var username = $routeParams["username"];
        //console.log($rootScope.currentUser.username);
        //$scope.username = username;
        UserService.lookupUserByUsername(username, function(user){
            console.log("after lookup user " + user.username +"  " + user.password);
            $scope.user = user;
        });

        $scope.update = function(user)
        {
           UserService.updateUser(user, function(user)
               {
                    console.log(user + "from profile controller");
                    $scope.user = user;
                    alert('Profile Updated');

               });
        }
    }
})();

