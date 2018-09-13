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

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const ApiRequest = {
    formatUrl,
    makeRequest,
    timeout
};

export default ApiRequest;