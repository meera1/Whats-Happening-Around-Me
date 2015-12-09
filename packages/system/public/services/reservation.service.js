(function () {

    angular
        .module("eventapp")
        .factory("ReservationService", ReservationService);

    function ReservationService($http, $q, $rootScope) {

        var api = {
            insertBooking: insertBooking,
            viewBooking: viewBooking,
            removeTicket: removeTicket
        }

        return api;

        function insertBooking(username, eventId, eventName, endDate, callback) {
            $http.post("/rest/bookticket", {
                username: username,
                eventId: eventId,
                eventName: eventName,
                endDate: endDate
            }).success(callback);
        }

        function viewBooking(username, callback) {
            console.log("called res service to view bookings");
            $http.get("/rest/viewticket/" + username).success(callback);
        }

        function removeTicket(username, eventId, callback){
            console.log(username + eventId+"from reserve service");
            $http.post("/rest/removeReservation", { username: username, eventId: eventId}).success(callback);
        }

    }

})();