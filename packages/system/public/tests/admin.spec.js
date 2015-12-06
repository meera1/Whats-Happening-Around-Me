/**
 *
 * Created by ameyapandilwar on 12/05/15 at 22:45 PM.
 */

(function() {

    "use strict";

    describe('Admin Controller Test Suite', function() {

        var controller, scope;

        beforeEach(module("eventapp"))

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('AdminController', {$scope: scope})
        }));

        it('admin controller should be initialized', function() {
            expect(controller).not.toBeNull();
        });

    });

})();