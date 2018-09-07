// import fetch from 'node-fetch';
const fetch = require('node-fetch');

const googleAPIKey = 'AIzaSyADkKUbRN0MZTvCLHMeM1d7XPN4CKNEstk';

let googleMaps = {};

googleMaps.placesNearby = async (params) => {
    const searchURL = encodeURI('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        + Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&')
        + `&key=${googleAPIKey}`);

    const rawResponse = await fetch(searchURL);
    const mapResponse = await rawResponse.json();

    return mapResponse.results.map(place => ({
        name: place.name,
        location: place.geometry.location
    }));
};

export default googleMaps;