/**
 *
 * Created by ameyapandilwar on 11/17/15 at Tue 5:06 PM
 */

(function() {

    "use strict";

    describe('Home Controller check', function() {

        var controller, scope;

        beforeEach(module("eventapp"))

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('HomeController', {$scope: scope})
            //console.log(scope);
        }));

        it('says hello world!', function () {
            expect(scope.greetMsg).toEqual('Hello World ');
        });
        it('says hello world!', function () {
            expect(scope.userName).toEqual('ameya');
         });

        it('test fn should be wham', function () {
            //console.log(scope.testFn);
            expect(scope.testFn()).toEqual('wham');
        });
        //
        //it('test fn should not be anything than wham', function () {
        //    expect(scope.testFn).toEqual('wham2');
        //});



        //it('should exist', function() {
        //    console.log('home controller exists');
        //    expect(controller).to.exist
        //});

        //describe("$scope.greet()", function() {

            //it('should add a greet method on the scope', function() {
            //    expect($scope.greet).to.exist
            //});


            //it("should return hello <name> for the name passed", function() {
            //    var cases = [{
            //        input: "Dries",
            //        expected: "hello Dries"
            //    }];
            //
            //    cases.forEach(function(testCase) {
            //        var result = $scope.greet(testCase.input);
            //        expect(result).to.equal(testCase.expected);
            //
            //    });
            //});


        //});

    });

})();