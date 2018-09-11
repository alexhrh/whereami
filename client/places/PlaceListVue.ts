import Observer from './Observer';

class PlaceListVue extends Observer {
    resultsElem: HTMLElement;

    constructor(resultsElem) {
        super();
        this.resultsElem = resultsElem;
    }

    render(placeList) {
        const parentElem = document.createElement('table');

        parentElem.innerHTML = '<tbody><tr><th>Name</th><th>Position</th><th>Distance</th></tr>'
        + placeList
            .map(place => `<tr><td>${place.name}</td><td>${round(place.location.lat, 1e6)} `
                + `${round(place.location.lng, 1e6)}</td><td>${round(place.distance, 1e2)}</td></tr>`)
            .join('');
        + '</tbody>';

        this.resultsElem.innerHTML = '';
        // @ts-ignore
        this.resultsElem.append(parentElem);
    }
}

function round(n, precision) {
    return Math.round(n * precision) / precision;
}

export default PlaceListVue;