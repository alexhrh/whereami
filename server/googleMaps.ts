import fetch from 'node-fetch';

const googleAPIKey = 'AIzaSyADkKUbRN0MZTvCLHMeM1d7XPN4CKNEstk';

async function placesNearby (params: MapQueryParams) {
    const searchURL = encodeURI('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        + Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&')
        + `&key=${googleAPIKey}`);

    const rawResponse = await fetch(searchURL);
    return await rawResponse.json();
}

interface MapQueryParams {
    location?: string;
    rankby?: string;
}

interface Place {
    name: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

interface MapResponse {
    results: Place[];
}

interface MapQuery {
    (params: MapQueryParams): Promise<MapResponse>;
}

interface GeoMap {
    placesNearby: MapQuery;
}

const googleMaps: GeoMap = {
    placesNearby
};

export default googleMaps;