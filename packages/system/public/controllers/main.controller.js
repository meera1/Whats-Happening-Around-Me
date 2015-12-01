(function()
{
 angular
    .module("eventapp")
    .controller("MainController", MainController)

    function MainController($scope, $location)
    {
       $scope.$location = $location;
    }


})();