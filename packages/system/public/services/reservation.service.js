(function () {

    angular
        .module("eventapp")
        .factory("ReservationService", ReservationService);

    function ReservationService($http, $q, $rootScope) {

        var api = {
            insertBooking: insertBooking,
            viewBooking: viewBooking
        }

        return api;

        function insertBooking(username, eventId, eventName, callback) {
            $http.post("/rest/bookticket", {
                username: username,
                eventId: eventId,
                eventName: eventName
            }).success(callback);
        }

        function viewBooking(username, callback) {
            $http.get("/rest/viewticket/" + username).success(callback);
        }

    }

})();