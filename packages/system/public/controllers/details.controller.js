(function(){

    angular
        .module("eventapp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams,$scope, DetailsService){

        var id = $routeParams.id;

        var detailsModel = this;

        detailsModel.addLikeForEvent = addLikeForEvent;
        detailsModel.addCommentForEvent = addCommentForEvent;


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

        function addCommentForEvent(eventId, comment){

            DetailsService
                   .addCommentForEvent(eventId,comment)
                   .then(function(response){

                        $scope.comments = response;
                        detailsModel.allComments = response;

                   });

        }

     }

})();

