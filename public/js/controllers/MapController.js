(function() {
    var app = angular.module("EifoAta");
    var MapController = function($scope, Sockets, API) {
        var markersDictionary = {};
        var telOfanStationsArray = [];
        var pazStationsArray = [];
        var sonolStationsArray = [];
        var watchPositionId;
        var map;

        initializeMap();

        Sockets.on('location update', function(location) {
            updateLocation(location);
        });

        $scope.sendLocation = function() {
            if ($scope.currentUser.userName) {
                $scope.sendingLocation = true;

                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                watchPositionId = navigator.geolocation.watchPosition(sendLocation, errorGetLocation, options);
            }
            else {
                $scope.errorMessage = "Please login first";
            }
        };
        
        function sendLocation(location) {
            var locationObject = {
                userName: $scope.currentUser.userName,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                icon: $scope.currentUser.icon,
                timeMS: new Date().getTime()
            };
            Sockets.emit('location update', locationObject);
            updateLocation(locationObject);
        }
        
        function updateLocation(location){
            var newLatLng = new google.maps.LatLng(location.latitude, location.longitude);
            if (!markersDictionary[location.userName]) {
                markersDictionary[location.userName] = createNewMarker(newLatLng, map, location.userName, location.icon);
            }
            else {
                markersDictionary[location.userName].setPosition(newLatLng);
            }
        }

        $scope.stopSendingLocation = function() {
            navigator.geolocation.clearWatch(watchPositionId);
            $scope.sendingLocation = false;
        };

        function initializeMap() {
            navigator.geolocation.getCurrentPosition(function(location) {
                var homeLatlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
                var mapOptions = {
                    center: homeLatlng,
                    zoom: 15
                };
                map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                initializeMapControls(map);
            });
        }

        function initializeMapControls(map) {
            initializeLayerControl(map, telOfanStationsArray, 1, "telOfan", "tel-ofan.png");
            initializeLayerControl(map, pazStationsArray, 2, "paz", "paz.gif");
            initializeLayerControl(map, sonolStationsArray, 3, "sonol", "sonol.png");

            var currentLocationControlDiv = document.createElement('div');
            var currentLocationControl = new MapControl(currentLocationControlDiv, 'Current Location', 'current-location.png');

            google.maps.event.addDomListener(currentLocationControlDiv, 'click', function() {
                navigator.geolocation.getCurrentPosition(function(location) {
                    var currentLatlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
                    map.setCenter(currentLatlng);
                });
            });

            currentLocationControlDiv.index = 2;
            map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(currentLocationControlDiv);
        }

        function initializeLayerControl(map, controlCoordsArray, index, layerName, imageName) {
            var controlDiv = document.createElement('div');
            // closure variable
            var control = new LayerMapControl(controlDiv, layerName, imageName);

            google.maps.event.addDomListener(controlDiv, 'click', function() {
                if (control.getActive()) {
                    setAllMap(controlCoordsArray, null);
                }
                else {
                    if (controlCoordsArray.length === 0) {
                        API.getLayer(layerName).then(function(response) {
                            if (response && response.data && response.data.coordinates) {
                                response.data.coordinates.forEach(function(coord, index) {
                                    var newLatLng = new google.maps.LatLng(coord.y, coord.x);
                                    controlCoordsArray.push(createNewMarker(newLatLng, map, "", imageName));
                                });
                            }
                        });
                    }
                    else {
                        setAllMap(controlCoordsArray, map);
                    }
                }
                control.toggleActive();
            });
            controlDiv.index = index;
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
        }

        function LayerMapControl(controlDiv, layerName, imageName) {
            controlDiv.className = 'layer-control-container';
            var controlUI = document.createElement('div');
            controlUI.className = 'layer-control';
            controlUI.title = layerName;
            controlDiv.appendChild(controlUI);
            var controlText = document.createElement('div');
            controlText.className = 'layer-control-text';
            controlText.innerHTML = '<img src=\"img/' + imageName + '\" rel=\" + layerName + \"/>';
            controlUI.appendChild(controlText);
        }

        function MapControl(controlDiv, layerName, imageName) {
            controlDiv.className = 'layer-control-container';
            var controlUI = document.createElement('div');
            controlUI.className = 'layer-control';
            controlUI.title = layerName;
            controlDiv.appendChild(controlUI);
            var controlText = document.createElement('div');
            controlText.className = 'layer-control-text';
            controlText.innerHTML = '<img src=\"img/' + imageName + '\" rel=\" + layerName + \"/>';
            controlUI.appendChild(controlText);
        }

        //LayerMapControl.acitve = null;
        LayerMapControl.prototype.getActive = function() {
            return this.active;
        };
        LayerMapControl.prototype.toggleActive = function() {
            this.active = !this.active;
        };

        function errorGetLocation(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        function createNewMarker(latLng, targetMap, user, icon) {
            return new google.maps.Marker({
                position: latLng,
                map: targetMap,
                title: user,
                animation: google.maps.Animation.DROP,
                icon: '/img/' + icon
            });
        }

        function setAllMap(markers, map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }
    };
    app.controller("MapController", MapController);
}());