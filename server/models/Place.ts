import GeoCoords from '../helpers/GeoCoords';

interface Location {
    lat: number;
    lng: number;
}

class Place {
    name: string;
    location: Location;
    distance: number;

    constructor(place) {
        this.name = place.name;
        this.location = place.geometry.location;
    }

    setDistance(location) {
        this.distance = GeoCoords.distanceOnEarth(this.location, location);
    }
}

export default Place;
export {Location};