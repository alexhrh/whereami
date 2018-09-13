import ApiRequest from '../helpers/ApiRequest';
import {concat} from 'lodash';

const key = 'AIzaSyADkKUbRN0MZTvCLHMeM1d7XPN4CKNEstk';
const apiUrl = 'https://maps.googleapis.com/maps/api';

function googleApiRequest(endpoint, params) {
    const url = ApiRequest.formatUrl(apiUrl, endpoint, Object.assign(params, {key}));
    console.log(url);
    return ApiRequest.makeRequest(url);
}

async function getAllPages(endpoint, params) {
    let mapResponses = [];
    let request = googleApiRequest(endpoint, params);

    while (true) {
        let response;
        try {
            response = await request;
        } catch (err) {
            console.log(err);
        }
        mapResponses.push(response);

        if (!response.next_page_token) {
            break;
        }

        await ApiRequest.timeout(1000);
        request = googleApiRequest(endpoint, {pagetoken: response.next_page_token});
    }

    // @ts-ignore
    return concat(...mapResponses.map(mapResponse => mapResponse.results));
}

const GoogleMapsApiHelpers = {
    googleApiRequest,
    getAllPages
};

export default GoogleMapsApiHelpers;