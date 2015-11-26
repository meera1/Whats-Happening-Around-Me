(function(){
   "use strict";

   describe('Search Controller Test Suite', function(){
        var controller, scope;

        beforeEach(module('eventapp'))

        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            controller = $controller('SearchController', {$scope : scope})
        }));

        it('Event location validator should return the same location name, if input is valid, else return Boston, MA', function(){
            var cases = [{
                input : "",
                expected: "Boston, MA"
            }, {
               input : "New York",
               expected: "New York"
           }];

           cases.forEach(function(testInput){
                var result = scope.getValidEventLocation(testInput.input);
                expect(result).toEqual(testInput.expected)
           })
        });

        it('Event name validator should return the same location name, if input is valid, else return a blank string', function(){
             var cases = [{
                input : undefined,
                expected: ""
            }, {
               input : "Music",
               expected: "Music"
           }];
            cases.forEach(function(testInput){
                var result = scope.getValidEventName(testInput.input);
                expect(result).toEqual(testInput.expected)
            })              ;

        });
   });
})();