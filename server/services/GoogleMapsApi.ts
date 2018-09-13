import Place from '../models/Place';
import GoogleMapsApiHelpers from './GoogleMapsApiHelpers';

const endpoints = {
    nearbySearch: '/place/nearbysearch/json',
    textSearch: '/place/textsearch/json'
};


function nearbySearch(params: MapQueryParams): Promise<MapResponse> {
    return GoogleMapsApiHelpers.googleApiRequest(endpoints.nearbySearch, params);
}

function textSearch(params: MapQueryParams): Promise<MapResponse> {
    return GoogleMapsApiHelpers.googleApiRequest(endpoints.textSearch, params);
}

function nearbySearchAll(params: MapQueryParams): Promise<MapResponse[]> {
    return GoogleMapsApiHelpers.getAllPages(endpoints.nearbySearch, params);
}

function textSearchAll(params: MapQueryParams): Promise<MapResponse[]> {
    return GoogleMapsApiHelpers.getAllPages(endpoints.textSearch, params);
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

const GoogleMapsApi = {
    nearbySearch,
    textSearch,
    nearbySearchAll,
    textSearchAll
};

export default GoogleMapsApi;