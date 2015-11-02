(function(){

    angular
        .module("eventapp")
        .controller("SearchController", SearchController);

    function SearchController($scope, SearchService){

        console.log("Inside Search controller");

        $scope.search = search;

        function search(eventName, eventLocation){

            SearchService.searchEventByNameAndLocation(eventName,eventLocation).then(function(response){

                $scope.data = response.events;
                $scope.$apply();
                console.log($scope.data);

            });
        }

    }

})();

