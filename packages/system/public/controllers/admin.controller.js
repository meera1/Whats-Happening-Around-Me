/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:30 PM.
 */

(function () {

    angular
        .module("eventapp")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminService) {

        var adminModel = this;

        retrieveCategories();

        function manageCategories(categories) {

        }

        function retrieveCategories() {
            AdminService
                .retrieveCategories(function (categories) {
                    $scope.adminModel.data = categories;
                });
        }

    }

})();

