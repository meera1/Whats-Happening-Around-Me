/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:30 PM.
 */

(function () {

    angular
        .module("eventapp")
        .controller("AdminController", AdminController);

    function AdminController($scope) {

        var adminModel = this;

        adminModel.name = "ameya";

        function manageCategories(categories) {

        }

    }

})();

