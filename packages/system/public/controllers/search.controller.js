(function(){

    angular
        .module("eventapp")
        .controller("SearchController", SearchController);

    function SearchController($scope, SearchService){

        console.log("Inside Search controller");

        var model = this;

//        $scope.search = search;

        model.search = search;

        function search(eventName, eventLocation){

            SearchService.searchEventByNameAndLocation(eventName,eventLocation).then(function(response){
                model.data = response.events;
                $scope.$apply();
                console.log($scope.model);
                populateMap(response.events);
            });
        }

        function populateMap(events){
            locations = [];
            events.event.forEach(function(event){
                locations.push([event.title, event.latitude + "," + event.longitude, event.url])
            });
            var geocoder;
            var map;
            var bounds = new google.maps.LatLngBounds();
            initialize();

            function initialize() {
                map = new google.maps.Map(
                document.getElementById("map_canvas"), {
                    //center: new google.maps.LatLng(37.4419, -122.1419),
                    //zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                geocoder = new google.maps.Geocoder();

                for (i = 0; i < locations.length; i++) {
                    geocodeAddress(locations, i);
                }

            }
            //google.maps.event.addDomListener(document.getElementById("search-button"), "click", initialize);

            function geocodeAddress(locations, i) {
                var title = locations[i][0];
                var address = locations[i][1];
                var url = locations[i][2];
                geocoder.geocode({
                    'address': locations[i][1]
                },

                function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                            map: map,
                            position: results[0].geometry.location,
                            title: title,
                            animation: google.maps.Animation.DROP,
                            address: address,
                            url: url
                        })
                        infoWindow(marker, map, title, address, url);
                        bounds.extend(marker.getPosition());
                        map.fitBounds(bounds);
                    } else {
                        console.log("geocode of " + address + " failed:" + status);
                    }
                });
            }

            function infoWindow(marker, map, title, address, url) {
                google.maps.event.addListener(marker, 'click', function () {
                    var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View Event</a></p></div>";
                    iw = new google.maps.InfoWindow({
                        content: html,
                        maxWidth: 350
                    });
                    iw.open(map, marker);
                });
            }

            function createMarker(results) {
                var marker = new google.maps.Marker({
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                    map: map,
                    position: results[0].geometry.location,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    address: address,
                    url: url
                })
                bounds.extend(marker.getPosition());
                map.fitBounds(bounds);
                infoWindow(marker, map, title, address, url);
                return marker;
            }
        }

    }

})();

