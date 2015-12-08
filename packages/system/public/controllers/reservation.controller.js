/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:30 PM.
 */

(function () {

    angular
        .module("eventapp")
        .controller("ReservationController", ReservationController);

    function ReservationController($scope, $rootScope, $routeParams, $location, DetailsService, ReservationService) {

        var reservationModel = this;

        reservationModel.confirmTicket = confirmTicket;
        reservationModel.showTickets = showTickets;

        reservationModel.confirmed = false;
        reservationModel.eventName = $routeParams.eventname;

        reservationModel.isHistoryVisible = false;

        getCurrentEvent();

        function getCurrentEvent() {
            reservationModel.currentEvent = DetailsService.getEvent();
            console.log(reservationModel.currentEvent);
        }

        function confirmTicket(event) {
            var username = $rootScope.currentUser.username;

            console.log(event.name.text);
            console.log(event.id);
            console.log(username);

            ReservationService.insertBooking(username, event.id, event.name.text, function(callback) {
                console.log("inside insert ticket controller");
                if (callback) {
                    reservationModel.confirmed = true;
                    reservationModel.alertType = "alert alert-success";
                    reservationModel.msg = "Tickets booked successfully!";
                }
                else {
                    reservationModel.msg = "You have already booked a ticket for this event!";
                    reservationModel.confirmed = true;
                    reservationModel.alertType = "alert alert-danger";
                }
            });
        }

        function showTickets() {
            var username = $rootScope.currentUser.username;

            ReservationService.viewBooking(username, function(callback) {
                console.log(callback);
                reservationModel.userTickets = callback;
                reservationModel.isHistoryVisible = true;
            })

        }
    }

})();

