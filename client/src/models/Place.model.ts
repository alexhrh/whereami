export default class PlaceModel {
    name: string;
    location: {lat: number, lng: number};
    distance: number;

    constructor(place) {
        this.name = place.name;
        this.location = place.location;
        this.distance = place.distance;
    }
}