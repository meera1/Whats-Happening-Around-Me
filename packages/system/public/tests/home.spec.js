/**
 *
 * Created by ameyapandilwar on 11/17/15 at Tue 5:06 PM
 */

(function() {

    "use strict";

    describe("HomeController", function() {

        var controller, $scope

        beforeEach(angular.mock.module("eventapp",[]))

        beforeEach(angular.mock.inject(function($rootScope, $controller) {
            $scope = $rootScope.$new()
            controller = $controller('HomeController', {$scope: $scope})
        }));


        it('should exist', function() {
            expect(controller).to.exist
        });

        describe("$scope.greet()", function() {

            it('should add a greet method on the scope', function() {
                expect($scope.greet).to.exist
            });


            it("should return hello <name> for the name passed", function() {
                var cases = [{
                    input: "Dries",
                    expected: "hello Dries"
                }, {
                    input: "blabla",
                    expected: "hello blabla"
                }, {
                    input: "23",
                    expected: "hello 23"
                }, {
                    input: 23,
                    expected: "hello 23"
                }];

                cases.forEach(function(testCase) {
                    var result = $scope.greet(testCase.input);
                    expect(result).to.equal(testCase.expected);

                });
            });

        });

    });

})();