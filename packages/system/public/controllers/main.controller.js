(function()
{
 angular
    .module("eventapp")
    .controller("MainController", MainController)

    function MainController($scope, $location, $rootScope, UserService)
    {

       var vm = this;

       vm.logout = logout;

       function logout()
       {
         UserService.logoutUser(function(response)
         {
            $rootScope.currentUser = null;
            $location.url("/home");
         });
       }
    }


})();