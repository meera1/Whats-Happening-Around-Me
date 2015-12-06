/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:30 PM.
 */

(function () {

    angular
        .module("eventapp")
        .controller("ReservationController", ReservationController);

    function ReservationController($scope, $routeParams, $location) {

        var reservationModel = this;

        reservationModel.confirmTicket = confirmTicket;

        reservationModel.confirmed = false;
        reservationModel.eventName = $routeParams.eventname;

        function confirmTicket() {
            reservationModel.confirmed = true;
        }

    }

})();

