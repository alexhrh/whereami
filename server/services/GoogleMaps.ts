import ApiRequest from '../helpers/ApiRequest';
import Place from '../models/Place';

const key = 'AIzaSyADkKUbRN0MZTvCLHMeM1d7XPN4CKNEstk';
const url = 'https://maps.googleapis.com/maps/api';
const endpoints = {
    nearbySearch: '/place/nearbysearch/json',
    textSearch: '/place/textsearch/json'
};


function nearbySearch(params: MapQueryParams): Promise<MapResponse> {
    return googleApiRequest(endpoints.nearbySearch, params);
}

function textSearch(params: MapQueryParams): Promise<MapResponse> {
    return googleApiRequest(endpoints.textSearch, params);
}

function nearbySearchAll(params: MapQueryParams): Promise<MapResponse[]> {
    return getAllPages(endpoints.nearbySearch, params);
}

function textSearchAll(params: MapQueryParams): Promise<MapResponse[]> {
    return getAllPages(endpoints.textSearch, params);
}

function googleApiRequest(endpoint, params: MapQueryParams) {
    return ApiRequest.makeRequest(ApiRequest.formatUrl(url,
        endpoint, Object.assign(params, {key})));
}

async function getAllPages(endpoint, params: MapQueryParams) {
    let pages = [];
    let request = googleApiRequest(endpoint, params);

    while (true) {
        const response = await request;

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(response);

        pages.push(response);

        if (!response.next_page_token) {
            break;
        }

        await new Promise((resolve, reject) => {
            setTimeout(resolve, 65000);
        });

        request = googleApiRequest(endpoint, {pagetoken: response.next_page_token});
    }

    return pages;
}

interface MapQueryParams {
    location?: string;
    rankby?: string;
    pagetoken?: string;
}

interface MapResponse {
    next_page_token?: string;
    results: Place[];
}

const GoogleMaps = {
    nearbySearch,
    textSearch,
    nearbySearchAll,
    textSearchAll,
    googleApiRequest,
    getAllPages
};

export default GoogleMaps;