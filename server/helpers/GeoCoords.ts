import {Location} from '../models/Place';

const toRadians = n => n * Math.PI / 180;

function distanceOnEarth(pointA: Location, pointB: Location): number {
    const radius = 6371e3;
    const φ1 = toRadians(pointA.lat);
    const φ2 = toRadians(pointB.lat);
    const Δφ = toRadians(pointB.lat - pointA.lat);
    const Δλ = toRadians(pointB.lng - pointA.lng);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseCoords(location): Location {
    const [lat, lng] = location.trim().split(/, *| +/);
    return {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    };
}

const GeoCoords = {
    distanceOnEarth,
    parseCoords
};

export default GeoCoords;