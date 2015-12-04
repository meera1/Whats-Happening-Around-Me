(function()
{
 angular
    .module("eventapp")
    .controller("MainController", MainController)

    function MainController($scope, $location, $rootScope, UserService)
    {

       var vm = this;

       vm.logout = logout;

       function logout(){
         var currentUser = $rootScope.currentUser;

         UserService.logoutUser(currentUser, function(response){

                console.log("success inside main controller");
                $rootScope.currentUser = null;
                $location.url("/home");
         });
       }
    }
})();