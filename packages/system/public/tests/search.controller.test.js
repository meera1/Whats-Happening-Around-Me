(function(){
   "use strict";

   describe('Search Controller Test Suite', function(){
        var controller, scope;

        beforeEach(module('eventapp'))

        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            controller = $controller('SearchController', {$scope : scope})
        }));

        it('important fields cannot be null for event object', function(){
            var cases = [{
                    input:
                        {"events":[{"name":{"text":"Extreme Beer Fest (2016)","html":"Extreme Beer Fest (2016)"},"description":{"text":"Extreme Beer Fest is the ultimate throwdown of craft beer creativity.","html":"<P><STRONG>Extreme Beer Fest</STRONG>"},"logo":{"id":"14168736","url":"https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14168736%2F17177330475%2F1%2Foriginal.jpg?h=200&w=450&s=66c76f3a794d7c310fb468b484690a33"}},{"name":{"text":"Boston Wine Expo 2016","html":"Boston Wine Expo 2016"},"description":{"text":"Discover an extraordinary world of great wine and food at the 25th Anniversary of the Boston Wine Expo.","html":"<DIV DIR=\"ltr\"><SPAN STYLE=\"font-family: tahoma,arial,helvetica,sans-serif; font-size: small;\">"},"logo":{"id":"14056099","url":"https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14056099%2F5515414525%2F1%2Foriginal.jpg?h=200&w=450&s=38e2b417f9669a27916b24705a7680ac"}}]},
                    expected:
                        [ Object({ name: Object({ text: 'Extreme Beer Fest (2016)', html: 'Extreme Beer Fest (2016)' }), description: Object({ text: 'Extreme Beer Fest is the ultimate throwdown of craft beer creativity.', html: '<P><STRONG>Extreme Beer Fest</STRONG>' }), logo: Object({ id: '14168736', url: 'https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14168736%2F17177330475%2F1%2Foriginal.jpg?h=200&w=450&s=66c76f3a794d7c310fb468b484690a33' }) }), Object({ name: Object({ text: 'Boston Wine Expo 2016', html: 'Boston Wine Expo 2016' }), description: Object({ text: 'Discover an extraordinary world of great wine and food at the 25th Anniversary of the Boston Wine Expo.', html: '<DIV DIR="ltr"><SPAN STYLE="font-family: tahoma,arial,helvetica,sans-serif; font-size: small;">' }), logo: Object({ id: '14056099', url: 'https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14056099%2F5515414525%2F1%2Foriginal.jpg?h=200&w=450&s=38e2b417f9669a27916b24705a7680ac' }) }) ]
            },
            {
                    input:
                        {"events":[{"name":{"html":"Extreme Beer Fest (2016)"},"description":{"text":"Extreme Beer Fest is the ultimate throwdown of craft beer creativity.","html":"<P><STRONG>Extreme Beer Fest</STRONG>"},"logo":{"id":"14168736","url":"https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14168736%2F17177330475%2F1%2Foriginal.jpg?h=200&w=450&s=66c76f3a794d7c310fb468b484690a33"}},{"name":{"text":"Boston Wine Expo 2016","html":"Boston Wine Expo 2016"},"description":{"text":"Discover an extraordinary world of great wine and food at the 25th Anniversary of the Boston Wine Expo.","html":"<DIV DIR=\"ltr\"><SPAN STYLE=\"font-family: tahoma,arial,helvetica,sans-serif; font-size: small;\">"},"logo":{"id":"14056099","url":"https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14056099%2F5515414525%2F1%2Foriginal.jpg?h=200&w=450&s=38e2b417f9669a27916b24705a7680ac"}}]},
                    expected:
                        [ Object({ name: Object({ text: 'Boston Wine Expo 2016', html: 'Boston Wine Expo 2016' }), description: Object({ text: 'Discover an extraordinary world of great wine and food at the 25th Anniversary of the Boston Wine Expo.', html: '<DIV DIR="ltr"><SPAN STYLE="font-family: tahoma,arial,helvetica,sans-serif; font-size: small;">' }), logo: Object({ id: '14056099', url: 'https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F14056099%2F5515414525%2F1%2Foriginal.jpg?h=200&w=450&s=38e2b417f9669a27916b24705a7680ac' }) }) ]
             }];

           cases.forEach(function(testInput){
                var result = scope.getOnlyValidEvents(testInput.input);
                expect(result).toEqual(testInput.expected)
           })
        });

        it('Should return complete address', function(){
                    var cases = [{
                        address_1 : "75 St Alphonsus",
                        address_2 : "Apt 1002",
                        city : "Boston",
                        region : "MA",
                        expected: "75 St Alphonsus, Apt 1002, Boston, MA"
                    }, {
                       address_1 : "75 St Alphonsus",
                       address_2 : "",
                       city : "Boston",
                       region : "MA",
                       expected: "75 St Alphonsus, Boston, MA"
                   }, {
                       address_1 : "",
                       address_2 : "",
                       city : "",
                       region : "",
                       expected: "<No Address Specified>"
                   }];

                   cases.forEach(function(testInput){
                        var result = scope.getCompleteAddress(testInput.address_1, testInput.address_2, testInput.city, testInput.region);
                        expect(result).toEqual(testInput.expected)
                   })
                });

        it('Event location validator should return the same location name, if input is valid, else return Boston, MA', function(){
            var cases = [{
                input : "",
                expected: "location.address=Boston, MA"
            }, {
               input : "New York",
               expected: "location.address=New York"
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