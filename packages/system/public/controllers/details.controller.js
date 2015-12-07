(function(){

    angular
        .module("eventapp")
        .controller("DetailsController", DetailsController);


    function DetailsController($routeParams,$scope,$rootScope, DetailsService, SearchService){

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
        detailsModel.removeCommentForEvent = removeCommentForEvent;

        detailsModel.events = {}

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


        function populateMap(locations){
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
                    //zoom: -20,
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

