(function(){

    angular
        .module("eventapp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $rootScope, UserService, HomeService){
        var model = this;
        var username = $rootScope.currentUser.username;
        //console.log("route params from profile controller "+ $routeParams["username"]);
        console.log("route params from profile controller "+ username);
        //var username = $routeParams["username"];
        //console.log($rootScope.currentUser.username);
        //$scope.username = username;
        $scope.selection = [];
        UserService.lookupUserByUsername(username, function(user){
            console.log("after lookup user " + user.username +"  " + user.password);
            $scope.user = user;
            $scope.selection = $scope.user.preferences;
        });

        $scope.update = function(user)
        {

           console.log("User updating...");
           console.log(user);
           console.log("Update User preferences:");
           console.log($scope.selection)
           user.preferences = $scope.selection
           UserService.updateUser(user, function(user)
               {
                    console.log("After update");
                    console.log(user);
                    $scope.user = user;
                    alert('Profile Updated');

               });
        }

        console.log("Fetching categories...");
        HomeService.retrieveCategories(function(response){
            model.categories = response;
            console.log(response);
        });

          // toggle selection for a given employee by name

          $scope.toggleSelection = function toggleSelection(categoryId) {
             var idx = $scope.selection.indexOf(categoryId);

             // is currently selected
             if (idx > -1) {
               $scope.selection.splice(idx, 1);
             }

             // is newly selected
             else {
               $scope.selection.push(categoryId);
             }
             console.log($scope.selection)
          };

    }
})();

