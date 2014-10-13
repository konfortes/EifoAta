 (function(layersController) {
     //var fs = require("fs");
     var http = require('http');
     var https = require('https');
     var auth = require("../auth");

     var layersDataMiningDetails = {
         telOfan: {
             host: 'www.tel-o-fun.co.il',
             path: '/%D7%AA%D7%97%D7%A0%D7%95%D7%AA%D7%AA%D7%9C%D7%90%D7%95%D7%A4%D7%9F.aspx',
             protocol: https,
             pattern: /x=\'([0-9]+.[0-9]+)\' y=\'([0-9]+.[0-9]+)\'/g,
             cacheKey: 'telOfanLayer'
         },
         paz: {
             host: 'www.paz.co.il',
             path: '/index.aspx?id=4340',
             protocol: http,
             pattern: /<div class=\'mapx\'>([0-9]+.[0-9]+)<\/div> <div class=\'mapy\'>([0-9]+.[0-9]+)<\/div>/g,
             cacheKey: 'pazStationsLayer'
         },
         sonol: {
             host: 'www.sonol.co.il',
             path: '/sonol_stations/map/',
             protocol: http,
             pattern: /\"lon\" : ([0-9]+.[0-9]+),\"lat\" : ([0-9]+.[0-9]+)}/g,
             cacheKey: 'sonolStationsLayer'
         }
     };

     layersController.init = function(app) {
         app.get("/api/layers/:layerName", auth.ensureAuthenticated, function(req, res) {
             var dataMiningDetails = layersDataMiningDetails[req.params.layerName];
             if (dataMiningDetails) {
                 getCoordinates(dataMiningDetails, responseCoordinates);
             }

             function responseCoordinates(coordinates) {
                 if (coordinates) {
                     res.send(coordinates);
                 }
                 else {
                     res.send({
                         success: false,
                         msg: 'Could not mine coordinates'
                     });
                 }
             }
         });

         function getCoordinates(dataMiningDetails, next) {
             var coordinates = tryGetFromCache(dataMiningDetails.cacheKey);
             if (coordinates) {
                 next(coordinates);
             }
             else {
                 mineCoordinates(dataMiningDetails, next);
             }
         }

         function tryGetFromCache(cacheKey) {
             // sync version
             var cachedValue = app.cache.get(cacheKey);
             if (cachedValue && cachedValue[cacheKey]) {
                 return cachedValue[cacheKey];
             }
         }

         function mineCoordinates(dataMiningDetails, next) {
             var requestOptions = {
                 host: dataMiningDetails.host,
                 path: dataMiningDetails.path,
                 method: 'GET'
             };

             var text;
             dataMiningDetails.protocol.request(requestOptions, function(response) {
                 response.on('data', function(chunk) {
                     text += chunk;
                 });

                 response.on('end', function() {
                     var coords = processResponse(text, dataMiningDetails.pattern);
                     if (coords && coords.coordinates.length > 0) {
                         // sync version
                         app.cache.set(dataMiningDetails.cacheKey, coords, 7200);
                     }
                     return next(coords);
                 });
             }).end();
         }

         function processResponse(response, pattern) {
             var jsonStringArray = [];
             jsonStringArray.push("{\"dateGenerated\" : \"" + new Date() + "\",\"coordinates\" : [");
             var coordsArray = getCoordinatesArray(response, pattern);
             if (coordsArray.length > 0) {
                 jsonStringArray = jsonStringArray.concat(coordsArray);
                 jsonStringArray[jsonStringArray.length - 1] = jsonStringArray[jsonStringArray.length - 1].slice(0, -1);
             }
             jsonStringArray.push("]}");
             var jsonString = jsonStringArray.join("");
             var coords = JSON.parse(jsonString);
             return coords;
         }

         function getCoordinatesArray(text, pattern) {
             var match;
             var coordsArray = [];
             do {
                 match = pattern.exec(text);
                 if (match) {
                     coordsArray.push("{\"x\":\"" + match[1] + "\", \"y\":\"" + match[2] + "\"},");
                 }
             } while (match);

             return coordsArray;
         }
     };
 })(module.exports);