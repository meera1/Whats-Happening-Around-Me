(function () {

    angular
        .module("eventapp")
        .controller("HomeController", HomeController);

    function HomeController($scope, HomeService) {
        console.log(" == inside HomeController");
        var homeModel = this;

        retrieveCategories();

        //HomeService.getCategories().then(function (response) {
        //
        //    retrieveCategories();
        //    //insertCategories(response.categories);
        //});

        function insertCategories(categories) {
            HomeService
                .insertCategories(categories)
                .then(function (response) {
                    $scope.blah = response;
                });
        }

        function retrieveCategories() {
            HomeService
                .retrieveCategories(function (categories) {
                    $scope.homeModel.data = categories;
                });
        }

    }

})();

