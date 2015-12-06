/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:45 PM.
 */

(function() {

    "use strict";

    describe('Reservation Controller Test Suite', function() {

        var controller, scope;

        beforeEach(module("eventapp"))

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('ReservationController', {$scope: scope})
        }));

        it('reservation controller should be initialized', function() {
            expect(controller).not.toBeNull();
        });

        it('the alert box should not be visible on page load', function () {
            expect(controller.confirmed).toBe(false);
        });

        it('the confirm button should not be disabled on page load', function () {
            expect(!controller.confirmed).toBe(true);
        });

        it('the alert box should be visible after clicking confirm button', function () {
            var result = controller.confirmTicket();
            expect(controller.confirmed).toBe(true);
        });

        it('the confirm button should be disabled after clicking confirm button', function () {
            var result = controller.confirmTicket();
            expect(!controller.confirmed).toBe(false);
        });

    });

})();