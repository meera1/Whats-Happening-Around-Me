/**
 *
 * Created by ameyapandilwar on 11/17/15 at Tue 5:06 PM
 */

(function() {

    "use strict";

    describe('Home Controller Test Suite', function() {

        var controller, scope;

        beforeEach(module("eventapp"))

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('HomeController', {$scope: scope})
        }));

        it('controller should not be null', function() {
            expect(controller).not.toBeNull();
        });

        it('says hello world!', function () {
            expect(scope.greetMsg).toEqual('Hello, World!');
        });

        it('test fn should return wham', function () {
            expect(scope.testFn()).toEqual('wham');
        });

        describe("$scope.testFn()", function() {

            it("should return hello <name> for the name passed", function() {
                var cases = [{
                    input: "WHAM",
                    expected: "Hello, WHAM!"
                },
                    {
                    input: "J.A.R.V.I.S.",
                    expected: "Hello, J.A.R.V.I.S.!"
                }];

                cases.forEach(function(testCase) {
                    var result = scope.greet(testCase.input);
                    expect(result).toEqual(testCase.expected);

                });
            });


        });

    });

})();