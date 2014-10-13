(function(weatherController) {
    var https = require('https');
    weatherController.init = function(app) {

        app.get("/api/weather/current", function(req, res) {
            var latitude = req.query["latitude"];
            var longitude = req.query["longitude"];

            var extra = {
                apiKey: 'AIzaSyAgaxynZjLFqhnjGqpJZlO5RK0vbYg2gxs',
                formatter: null // 'gpx', 'string', ...
            };
            var geocoder = require('node-geocoder').getGeocoder('google', 'https', extra);

            geocoder.reverse(latitude, longitude)
                .then(function(locationResponse) {
                    var requestOptions = {
                        host: 'api.worldweatheronline.com',
                        path: '/free/v1/weather.ashx?q=' + encodeURIComponent(locationResponse[0].city) + '&format=json&num_of_days=5&key=d5f4e7ff289ba048a2be6e25761c6c3ad36f6b41',
                        method: 'GET'
                    };
                    var weatherResult;
                    https.request(requestOptions, function(weatherResponse) {
                        weatherResponse.on('data', function(chunk) {
                            if(chunk){
                                weatherResult += chunk;    
                            }
                        });

                        weatherResponse.on('end', function() {
                            console.log(weatherResult.substring(9));
                            var forecast = JSON.parse(weatherResult);
                        });
                    }).end();
                })
                .catch(function(err) {
                    console.log(err);
                });

        });
    };
})(module.exports);