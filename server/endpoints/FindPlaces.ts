import GoogleMapsApi from '../services/GoogleMapsApi';
import GeoCoords from '../helpers/GeoCoords';
import Place from '../models/Place';
import ApiRequest from '../helpers/ApiRequest';
import {unionBy} from 'lodash';

export default async function findPlaces(req, res) {
    const location = GeoCoords.parseCoords(req.body.location);

    const maxResults = 60;
    const maxRadiusGrowth = 4;
    let radius = 30;
    let requestAttempts = 5;

    const getNextRadius = getNextRadiusFunc({
        maxResults,
        maxRadiusGrowth,
        radius,
        requestAttempts: requestAttempts - 1,
    });

    let googlePlaceLists = [];
    while (true) {
        let googlePlaceList;
        try {
            googlePlaceList = await GoogleMapsApi.nearbySearchAll(Object.assign({
                radius
            }, req.body));
        } catch (err) {
            console.log(err);
        }

        requestAttempts--;
        googlePlaceLists.push(googlePlaceList);

        if (googlePlaceList.length >= maxResults || requestAttempts <= 0) {
            break;
        }

        radius = getNextRadius(googlePlaceList.length);
        await ApiRequest.timeout(1000);
    }

    res.send(aggregatePlaces(googlePlaceLists, location)
        .sort((place1, place2) => place1.distance - place2.distance));
}

function aggregatePlaces (googlePlaceLists, location) {
    // @ts-ignore
    return unionBy(...googlePlaceLists, 'place_id')
        .map(googlePlace => {
            const place = new Place(googlePlace);
            place.setDistance(location);
            return place;
        });
}

function getNextRadiusFunc(params) {
    let {requestAttempts, radius, maxResults, maxRadiusGrowth} = Object.assign({
        requestAttempts: 4,
        radius: 20,
        maxResults: 20,
        maxRadiusGrowth: 5
    }, params);

    return function (resultsFound) {
        if (requestAttempts <= 0) {
            throw new Error('no attempts left');
        }

        const area = Math.pow(radius, 2);
        const maxArea = area / resultsFound * maxResults;
        const nextArea = (maxArea - area) / requestAttempts + area;
        radius = Math.min(Math.sqrt(nextArea), radius * maxRadiusGrowth);

        requestAttempts--;
        return radius;
    };
}