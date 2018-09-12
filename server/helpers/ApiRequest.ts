import fetch from 'node-fetch';

function formatUrl(api, endpoint, params) {
    return encodeURI(`${api}${endpoint}?`
        + Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&'));
}

async function makeRequest(url) {
    const rawResponse = await fetch(url);
    return await rawResponse.json();
}

const ApiRequest = {
    formatUrl,
    makeRequest
};

export default ApiRequest;