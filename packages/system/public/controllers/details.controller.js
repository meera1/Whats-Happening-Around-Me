(function(){

    angular
        .module("eventapp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams,$scope, DetailsService){

        var id = $routeParams.id;

        console.log("Inside Details controller " + id);

        DetailsService.searchById(id).then(function(response){

                $scope.event = response;
                $scope.$apply();
         });
        }



})();

