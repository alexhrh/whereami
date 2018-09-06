const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyADkKUbRN0MZTvCLHMeM1d7XPN4CKNEstk',
    Promise: Promise
});

export default async function placesNearby (location) {
    const mapResponse = await googleMapsClient.placesNearby({
        location,
        radius: 50,
    }).asPromise();

    return mapResponse.json.results.map(place => ({
        name: place.name,
        location: place.geometry.location
    }));
}