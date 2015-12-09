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
        //reservationModel.removeReservations = removeReservations;
        //reservationModel.showTickets = showTickets;

        reservationModel.confirmed = false;
        reservationModel.deleted = false;

        reservationModel.eventName = $routeParams.eventname;

        reservationModel.isHistoryVisible = false;

        getCurrentEvent();


        var init = function(){
                    if($rootScope.currentUser != undefined)
                    {
                         ReservationService.viewBooking($rootScope.currentUser.username, function(callback) {
                         console.log("after fetching the reservations  "+ callback);
                         $scope.reservations = callback;
                    })
                    }


        }

        init();






        function getCurrentEvent() {
            reservationModel.currentEvent = DetailsService.getEvent();
            console.log(reservationModel.currentEvent);
        }

        function confirmTicket(event) {
            var username = $rootScope.currentUser.username;

            console.log(event.name.text);
            console.log(event.id);
            console.log(event.end.local);
            console.log(username);

            ReservationService.insertBooking(username, event.id, event.name.text, event.end.local, function(callback) {
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


        $scope.removeReservations = function (r){
            console.log($rootScope.currentUser.username);
            console.log(r.eventName+ "  from remove reservation"+ r.eventId);
            ReservationService.removeTicket($rootScope.currentUser.username, r.eventId, function(callback){
            console.log(callback+" after removing reservation ");
            $scope.reservations = callback;
            //reservationModel.deleted = true;
            //reservationModel.msg1 = "Cancelled Reservation"
            });
        }


    }

})();

