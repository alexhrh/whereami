import GeoCoords from '../helpers/GeoCoords';

interface Location {
    lat: number;
    lng: number;
}

class Place {
    name: string;
    location: Location;
    distance: number;

    constructor(place, params) {
        this.name = place.name;
        this.location = place.geometry.location;
        this.distance = GeoCoords.distanceOnEarth(this.location, params.location);
    }
}

export default Place;
export {Location};