(function(){

    angular
        .module("eventapp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams,$scope, DetailsService){

        var id = $routeParams.id;

        var detailsModel = this;

        detailsModel.addLikeForEvent = addLikeForEvent;

        DetailsService.searchById(id).then(function(response){

                detailsModel.event = response;
                $scope.$apply();
         });

        function addLikeForEvent(eventId){

            DetailsService
                   .addLikeForEvent(eventId)
                   .then(function(response){

                        $scope.blah = response;

                   });
        }

     }

})();

