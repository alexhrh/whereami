'use strict';

let googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyADkKUbRN0MZTvCLHMeM1d7XPN4CKNEstk',
    Promise: Promise
});

let http = require('http'), url = require('url');
let staticFile = require('./staticFile');
http.createServer(onRequest).listen(3000);
console.log('server started on port 3000');

function onRequest(request, response) {
    let urlObj = url.parse(request.url);
    let dir = './client';
    console.log(urlObj.pathname);

    if (urlObj.pathname === '/findplaces') {
        let searchParams = parseSearchString(urlObj.search);

        googleMapsClient.places({
            location: searchParams.location,
            query: searchParams.query,
            radius: +searchParams.radius,
        })
        .asPromise()
        .then(function (mapResponse) {
            console.log(mapResponse.json.results);
            console.log(JSON.stringify(mapResponse.json.results[0].geometry));

            let[lat, lon] = searchParams.location.split(' ');
            lat = Number(lat);
            lon = Number(lon);

            let namesAndCoords = mapResponse.json.results.map(place => ({
                name: place.name,
                location: place.geometry.location
            }))
            .sort((place1, place2) => distanceOnEarth(lat, lon, place1.location.lat, place1.location.lon) - 
                distanceOnEarth(lat, lon, place2.location.lat, place2.location.lon)
            );

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(namesAndCoords));

        }).catch(function (err) {
            console.log(err);
        });

    } else {
        staticFile(request, response, dir + urlObj.pathname);
    }
}

function parseSearchString(searchString) {
    let params = {};
    decodeURIComponent(searchString.slice(1))
        .split('&')
        .map(pair => {
            let [key, value] = pair.split('=');
            params[key] = value;
        });
    return params;
}

function distanceOnEarth(lat1, lon1, lat2, lon2) {
    var radius = 6371e3;
    var φ1 = toRadians(lat1)
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat2-lat1);
    var Δλ = toRadians(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return radius * c;
}

function toRadians(n) {
    return n * Math.PI / 180;
}