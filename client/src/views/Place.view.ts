import PlaceModel from '../models/Place.model';

export default class PlaceView {
    parentElem: HTMLElement;

    constructor(parentElem) {
        this.parentElem = parentElem;
    }

    render(placeModel: PlaceModel) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${placeModel.name}</td>`
            + `<td>${round(placeModel.location.lat, 1e6)} ${round(placeModel.location.lng, 1e6)}</td>`
            + `<td>${round(placeModel.distance, 1e2)}</td>`;

        this.parentElem.appendChild(tr);
    }
}

function round(n, precision) {
    return Math.round(n * precision) / precision;
}