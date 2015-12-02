(function(){

    angular
        .module("eventapp")
        .controller("HomeController", HomeController);

    function HomeController($scope, HomeService){
        console.log(" == inside HomeController");
        var homeModel = this;

        HomeService.getCategories().then(function(response){
            homeModel.data = response.categories;
            $scope.$apply();
        });

    }

})();

