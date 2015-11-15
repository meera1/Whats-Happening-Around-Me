(function(){

    angular
        .module("eventapp")
        .controller("SearchController", SearchController);

    function SearchController($scope, SearchService){

        console.log("Inside Search controller");

        var model = this;

//        $scope.search = search;

        model.search = search;

        function search(eventName, eventLocation){

            SearchService.searchEventByNameAndLocation(eventName,eventLocation).then(function(response){

                model.data = response.events;
                $scope.$apply();
                console.log($scope.model);

            });
        }

    }

})();

