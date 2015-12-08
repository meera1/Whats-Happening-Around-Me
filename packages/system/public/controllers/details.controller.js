(function(){

    angular
        .module("eventapp")
        .controller("DetailsController", DetailsController);

    var latitude = 0.0;
    var longitude = 0.0;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    }


    function DetailsController($routeParams,$scope,$rootScope,$sce, DetailsService, SearchService){

         $rootScope.apiKeys = ["IGMX6ZKRMBLH5TOCEMKU","WMM76DC53N75L2J5T32V","WXRBOESQZZRDO4WWV72X","LOGWBWOABJJTLQZDQI2A","CCLCEWYWLCGOE47RAALI"];

         if($rootScope.currentApiKey == null || $rootScope.currentApiKey == "" || $rootScope.currentApiKey == undefined){
            var randomIndex = 0;
            var maxLength = $rootScope.apiKeys.length;

            //choosing a random key
            while(true){
                randomIndex = Math.floor(Math.random()*(maxLength+1)+0);
                if(randomIndex<maxLength){
                    break;
                }
            }

            $rootScope.currentApiKey = $rootScope.apiKeys[randomIndex];
        }

        var detailsModel = this;
        var username = null;
        detailsModel.usernameUI = null;
        if($rootScope.currentUser != null){
            username = $rootScope.currentUser.username;
            detailsModel.usernameUI = $rootScope.currentUser.username;
        }

        var id = $routeParams.id;

        detailsModel.addLikeForEvent = addLikeForEvent;
        detailsModel.addDisLikeForEvent = addDisLikeForEvent;
        detailsModel.addCommentForEvent = addCommentForEvent;
        detailsModel.showDirections = showDirections;
        detailsModel.renderHtml = renderHtml;
        detailsModel.removeCommentForEvent = removeCommentForEvent;
        detailsModel.saveEvent = saveEvent;
        detailsModel.events = {}

        var source = "";
        var destination = "";

        DetailsService.getAllEvents(id, function(response){
            console.log("getAllEvents:")
            console.log(response)
            detailsModel.events = response;
        });

        DetailsService.searchById(id).then(function(response){
                var completeAddress = "";
                var venueName = "<No Name Specified>";
                var updatedURL = "";
                var eventName = "<No Event Name Specified>";
                detailsModel.event = response;
                console.log(response);
                 if(response.name.text != null){
                    eventName = response.name.text;
                }

                document.getElementById("event-error").style.display = "none";
                $("#detailContent").show();

                SearchService.getAllVenues(response.venue_id).then(function(venue_response){
                    if(venue_response.name != null){
                        venueName = venue_response.name;
                    }
                    var completeAddress = getCompleteAddress(venue_response.address.address_1,venue_response.address.address_2,
                              venue_response.address.city,venue_response.address.region);
                    destination = completeAddress;
                    console.log("venue_response.name.text:"  +venue_response.name.text);
                    console.log(" response.name:"  + response.name   );
                    populateMap([[venueName,venue_response.latitude+","+venue_response.longitude,
                                    completeAddress, eventName]]);

                    document.getElementById("event-error").style.display = "none";
                    $("#detailContent").show();

                    if($rootScope.currentUser!=null){
                         DetailsService.checkforlikes(username,id, function(callback){
                                 //console.log("after lookup event schema for that user choice " + event.username +"  " + event.choice);
                                 //$scope.user = user;
                                 //$scope.selection = $scope.user.preferences;
                                 console.log("check for like in details controller  "+ callback);
                                 $scope.choice = callback;

                        });
                    }

                    $scope.$apply();
                },function(reason){

                    console.log("failed at Details controller at getAllvenues promise" + reason);

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

                     document.getElementById("event-error").style.display = "block";
                     $("#detailContent").hide();

                });
                stButtons.locateElements();
         },function(reason){

            console.log("failed at Details controller at details searchbyid promise: " + reason);

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
             document.getElementById("event-error").style.display = "block";
             $("#detailContent").hide();
         });

        function saveEvent(event) {
            DetailsService.saveEvent(event, function(response){
                console.log(response);
            });
        }

        function showDirections() {
            if (latitude == 0.0 || longitude == 0.0) {
                source = "Boston, MA";
            } else {
                var latlng = {lat: latitude, lng: longitude};
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({'location': latlng}, function (results, status) {
                    source = results[0].formatted_address;

                    var selectedMode = document.getElementById('mode').value;

                    directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: source,
                        destination: destination,
                        travelMode: google.maps.TravelMode[selectedMode]
                    };

                    directionsService.route(request, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            detailsModel.directionSteps = result;
                            $scope.$apply();
                        }
                    });
                });
            }
        }

        function renderHtml(unrendered) {
            return $sce.trustAsHtml(unrendered);
        }

        function addLikeForEvent(eventId){

            var username = $rootScope.currentUser.username;
            console.log(username + eventId+ " from details.controller like");
            DetailsService.addLikeForEvent(eventId, username, function(callback)
            {
                console.log(callback + "from details controller for like");
                $scope.choice = callback.choice;
            });

        }



        function addDisLikeForEvent(eventId){
            var username = $rootScope.currentUser.username;
            console.log(username + eventId+ " from details.controller dislike");
            DetailsService.addDisLikeForEvent(eventId, username, function(callback)
            {
                console.log(callback + "from details controller for dislike");
                $scope.choice = callback.choice;

            });

        }


        function addCommentForEvent(eventId, comment){
            var username = $rootScope.currentUser.username;
            DetailsService
                   .addCommentForEvent(username, eventId, comment, function(response){
                        console.log("Add Comment Response: ");
                        console.log(response);
                        //$scope.comments = response;
                        detailsModel.events = getUpdatedEventList(response);
                        console.log(detailsModel.events);
                   });
        }

        function removeCommentForEvent(eventId, comment){
            var username = $rootScope.currentUser.username;
            DetailsService
                   .removeCommentForEvent(username, eventId, comment, function(response){
                        console.log("Remove Comment: ");
                        console.log(response);
                        //$scope.comments = response;
                        detailsModel.events = getUpdatedEventList(response);
                   });
        }

        function getUpdatedEventList(modifiedEvent){
            var toReturn = [];
            var hasEvent = false;

            for(i in detailsModel.events){
                console.log("detailsModel.events:");
                console.log(detailsModel.events[i].username);
                console.log(modifiedEvent.username);
                if(detailsModel.events[i].username === modifiedEvent.username){
                    toReturn.push(modifiedEvent);
                    hasEvent = true;
                } else {
                    toReturn.push(detailsModel.events[i]);
                }
            }

            if(!hasEvent)
                toReturn.push(modifiedEvent)

            console.log("toReturn:");
            console.log(toReturn);
            return toReturn;
        }

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            var selectedMode = document.getElementById('mode').value;
            var src = null;
            if (latitude == 0.0 || longitude == 0.0) {
                src = "Boston, MA";
            } else {
                src = {lat: latitude, lng: longitude};
            }
            directionsService.route({
                origin: src,
                destination: destination,
                travelMode: google.maps.TravelMode[selectedMode]
            }, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        function populateMap(locations){
            var geocoder;
            var map;
            var bounds = new google.maps.LatLngBounds();
            initialize();

            showDirections();

            function initialize() {
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var directionsService = new google.maps.DirectionsService;
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                    zoom: 14,
                    center: {lat: latitude, lng: longitude}
                });
                directionsDisplay.setMap(map);

                calculateAndDisplayRoute(directionsService, directionsDisplay);
                document.getElementById('mode').addEventListener('change', function() {
                    calculateAndDisplayRoute(directionsService, directionsDisplay);
                });

                //geocoder = new google.maps.Geocoder();
                //
                //for (i = 0; i < locations.length; i++) {
                //    geocodeAddress(locations, i);
                //}

            }

            function geocodeAddress(locations, i) {
                var title = locations[i][0];
                var address = locations[i][1];

                var completeAddress = locations[i][2];
                var eventName = locations[i][3];
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
                            completeAddress: completeAddress,
                            eventName: eventName
                        })
                        infoWindow(marker, map, title, address, completeAddress, eventName);
                        bounds.extend(marker.getPosition());
                        map.fitBounds(bounds);
                    } else {
                        console.log("geocode of " + address + " failed:" + status);
                    }
                });
            }

            function infoWindow(marker, map, title, address, completeAddress, eventName) {
                google.maps.event.addListener(marker, 'click', function () {
                    var html = "<div><h3>" + eventName + "</h3><p>"+ title + "</p><p>" + completeAddress + "</p></div>";
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

        function getCompleteAddress(address_1, address_2, city, region){

            var completeAddress = "";

             if(address_1 != null && address_1 != "")
                completeAddress = completeAddress + address_1 + ", ";
            if(address_2 != null && address_2 != "")
                completeAddress = completeAddress + address_2 + ", ";
            if(city != null && city != "")
                completeAddress = completeAddress + city.trim() + ", ";
            if(region != null && region != "")
                completeAddress = completeAddress + region;

            if(completeAddress.length === 0)
                completeAddress = "<No Address Specified>";

            return completeAddress;

        }
     }

})();

