(function () {

    angular
        .module("eventapp")
        .controller("SearchController", SearchController);

    var latitude = 0.0;
    var longitude = 0.0;
    var within = 10;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Current location: " + position.coords.latitude + ", " + position.coords.longitude);
            latitude = position.coords.latitude
            longitude = position.coords.longitude;
        });
    }

    //var map;
    var cachedEvents;
    var cachedLocations;

    function SearchController($scope, $rootScope, SearchService, UserService) {

        $rootScope.apiKeys = ["IGMX6ZKRMBLH5TOCEMKU","WMM76DC53N75L2J5T32V","WXRBOESQZZRDO4WWV72X","LOGWBWOABJJTLQZDQI2A","HIWZN4LLCZBJRAIDF5","CCLCEWYWLCGOE47RAALI"];

        if($rootScope.currentApiKey == null || $rootScope.currentApiKey == "" || $rootScope.currentApiKey == undefined){
            var randomIndex = 0;
            var maxLength = $rootScope.apiKeys.length;

            //choosing a random key
            while(true){
                randomIndex = Math.floor(Math.random()*(maxLength+1)+0);
                if(randomIndex<=5){
                    break;
                }
            }

            $rootScope.currentApiKey = $rootScope.apiKeys[randomIndex];
        }

        console.log("Inside Search controller");
        var model = this;
        model.search = search;
        $scope.getValidEventLocation = getValidEventLocation;
        $scope.getValidEventName = getValidEventName;
        $scope.getCompleteAddress = getCompleteAddress;
        $scope.getOnlyValidEvents = getOnlyValidEvents;
        console.log("Checking user in $rootScope...");
        console.log($rootScope.currentUser);
        var username = ""
        $scope.preferences = [];

        if ($rootScope.currentUser != undefined) {
            username = $rootScope.currentUser.username;
            UserService.lookupUserByUsername(username, function (user) {
                $scope.preferences = user.preferences
            });
        }


        if (cachedEvents != null) {
            this.data = cachedEvents;
            console.log("cached locations == " + cachedLocations);
            document.getElementById("event-error").style.display = "none";
            document.getElementById("map_canvas").style.display = "block";

            //if (map == undefined) {
                setTimeout(function () {
                    populateMap(cachedLocations);
                }, 2000);
            //}
        } else{
            search("", "", "");
        }

        initAutocomplete();

        function search(eventName, eventLocation, reqPageNumber) {
            $("#loaderIcon").show();
            eventLocation = "";
            if (document != undefined && document.getElementById("event-location") != undefined)
                eventLocation = document.getElementById("event-location").value;
            eventLocation = getValidEventLocation(eventLocation);
            eventName = getValidEventName(eventName);
            preferences = $scope.preferences;

            SearchService.searchEventByNameAndLocation(eventName, eventLocation, preferences, reqPageNumber).then(function (eventsResponse) {

                console.log("already reached controller with response: ");
                console.log(eventsResponse);
                var pageCount = eventsResponse.pagination.page_count;
                $scope.pageCount = pageCount;
                var pageNumber = eventsResponse.pagination.page_number;
                $scope.pageNumber = pageNumber;
                var filteredResponse = getOnlyValidEvents(eventsResponse);
                cachedEvents = filteredResponse;

                model.data = filteredResponse;
                $scope.$apply();
                console.log($scope.model);

                $("#loaderIcon").hide();

                if (eventsResponse.events == null || eventsResponse.events == "") {
                    document.getElementById("event-error").style.display = "block";
                    document.getElementById("map_canvas").style.display = "none";
                    return;
                } else {
                    document.getElementById("event-error").style.display = "none";
                    document.getElementById("map_canvas").style.display = "block";
                }


                var results = [];

                var newlocations = [];
                var size = filteredResponse.length < 10 ? filteredResponse.length : 10;
                for (i = 0; i < size; i++) {

                    SearchService.getAllVenues(filteredResponse[i].venue_id).then(function (response) {

                        console.log("results are :" + response.latitude + response.name + response.longitude + response.resource_uri);

                        var completeAddress = "";
                        var venueName = "<No Name Specified>";
                        var updatedURL = "";
                        var eventName = "<No Event Name Specified>";

                        for (var k in filteredResponse) {

                            if (filteredResponse[k].venue_id === response.id) {
                                console.log("venue id from eventsres: " + filteredResponse[k].venue_id + "name is: " + filteredResponse[k].name.text);
                                console.log("venue id from response: " + response.id + "name is: " + response.name);
                                updatedURL = "#/details/" + filteredResponse[k].id;
                                if (filteredResponse[k].name.text != null) {
                                    eventName = filteredResponse[k].name.text;
                                }
                                break;
                            }
                        }

                        completeAddress = getCompleteAddress(response.address.address_1, response.address.address_2,
                            response.address.city, response.address.region);

                        if (response.name != null) {

                            venueName = response.name;

                        }

                        newlocations.push([venueName, response.latitude + "," + response.longitude,
                            updatedURL, completeAddress, eventName]);
                        cachedLocations = newlocations;
                    },function(reason){

                        console.log("failed in search controller promise for venues: " + reason);

                        for(i=0;i<$rootScope.apiKeys.length;i++){
                            if($rootScope.currentApiKey === $rootScope.apiKeys[i]){
                                if(i == $rootScope.apiKeys.length - 1){
                                    $rootScope.currentApiKey = $rootScope.apiKeys[0];
                                }else{
                                    $rootScope.currentApiKey = $rootScope.apiKeys[i+1];
                                }
                                break;
                            }
                        }

                        $("#loaderIcon").hide();
                        document.getElementById("event-error").style.display = "block";
                        document.getElementById("map_canvas").style.display = "none";

                    });

                }

                setTimeout(function () {
                    populateMap(newlocations);
                }, 2000);

            },function(reason){

                console.log("failed in search contoller promise for event search: " + reason);
                for(i=0;i<$rootScope.apiKeys.length;i++){
                    if($rootScope.currentApiKey === $rootScope.apiKeys[i]){
                        if(i == $rootScope.apiKeys.length - 1){
                            $rootScope.currentApiKey = $rootScope.apiKeys[0];
                        }else{
                            $rootScope.currentApiKey = $rootScope.apiKeys[i+1];
                        }
                        break;
                    }
                }

                $("#loaderIcon").hide();
                document.getElementById("event-error").style.display = "block";
                document.getElementById("map_canvas").style.display = "none";

            });
        }

        //this function can be tested
        function getOnlyValidEvents(eventsResponse) {

            var filteredResponse = [];

            for (i = 0; i < eventsResponse.events.length; i++) {
                if (eventsResponse.events[i].name != null && eventsResponse.events[i].name.text != null
                    && eventsResponse.events[i].name.text.length > 10
                    && eventsResponse.events[i].description != null
                    && eventsResponse.events[i].description.text != null
                    && eventsResponse.events[i].description.text.length > 30
                    && eventsResponse.events[i].logo != null && eventsResponse.events[i].logo.url != null) {

                    filteredResponse.push(eventsResponse.events[i]);
                }
            }

            return filteredResponse;
        }

        //this function can be tested

        function getCompleteAddress(address_1, address_2, city, region) {

            var completeAddress = "";

            if (address_1 != null && address_1 != "")
                completeAddress = completeAddress + address_1;
            if (address_2 != null && address_2 != "")
                completeAddress = completeAddress + ", " + address_2;
            if (city != null && city != "")
                completeAddress = completeAddress + ", " + city;
            if (region != null && region != "")
                completeAddress = completeAddress + ", " + region;

            if (completeAddress.length === 0)
                completeAddress = "<No Address Specified>";

            return completeAddress;

        }

        function populateMap(locations) {
//            locations = [];

//            events.event.forEach(function(event){
//                locations.push([event.title, event.latitude + "," + event.longitude, event.url])
//            });

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

                if (locations != null) {
                    for (i = 0; i < locations.length; i++) {
                        geocodeAddress(locations, i);
                    }
                }

            }

            //google.maps.event.addDomListener(document.getElementById("search-button"), "click", initialize);

            function geocodeAddress(locations, i) {
                var title = locations[i][0];
                var address = locations[i][1];
                var url = locations[i][2];
                var completeAddress = locations[i][3];
                var eventName = locations[i][4];
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
                                url: url,
                                completeAddress: completeAddress,
                                eventName: eventName
                            })
                            infoWindow(marker, map, title, address, url, completeAddress, eventName);
                            bounds.extend(marker.getPosition());
                            map.fitBounds(bounds);
                        } else {
                            console.log("geocode of " + address + " failed:" + status);
                        }
                    });
            }

            function infoWindow(marker, map, title, address, url, completeAddress, eventName) {
                google.maps.event.addListener(marker, 'click', function () {
                    var html = "<div><h3>" + eventName + "</h3><p>" + title + "</p><p>" + completeAddress + "</p><p><a href='" + url + "'>View Event</a></p></div>";
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

        function initAutocomplete() {
            var input = document.getElementById('event-location');
            var searchBox = new google.maps.places.SearchBox(input);
        }

        function getValidEventName(eventName) {
            if (eventName == undefined) eventName = ""
            return eventName
        }

        function getValidEventLocation(eventLocation) {
            console.log("getValidEventLocation");
            console.log("Input:" + eventLocation);
            if (eventLocation == undefined || eventLocation.trim() == "")
                if (latitude == 0.0 || longitude == 0.0) {
                    eventLocation = "location.address=Boston, MA";
                    if (document.getElementById("event-location") != null)
                        document.getElementById("event-location").value = "Boston, MA";
                } else {
                    eventLocation = "location.latitude=" + latitude + "&location.longitude=" + longitude;
                    var location = ""
                    var latlng = {lat: latitude, lng: longitude};
                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'location': latlng}, function (results, status) {
                        document.getElementById("event-location").value = location;
                    });

                }
            else {
                eventLocation = "location.address=" + eventLocation;
            }
            console.log("Output:" + eventLocation);
            return eventLocation
        }

        $scope.range = function (n) {
            var toReturn = [];
            for (i = 1; i <= n && i <= 15; i++)
                toReturn.push(i);
            return toReturn;
        };
    }

})();