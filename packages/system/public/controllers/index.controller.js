(function(){

    angular
        .module("eventapp",["ngRoute"])
        .controller("IndexController", IndexController);

    function IndexController($scope, EventService){

        console.log("Inside Index controller");

        $scope.search = search;

        function search(eventName, eventLocation){

            EventService.searchEventByNameAndLocation(eventName,eventLocation).then(function(response){

                $scope.allResults = response.events;

                alert("Check Console for results");

                console.log($scope.allResults);

            });
        }

    }

})();

