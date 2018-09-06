const toRadians = n => n * Math.PI / 180;

function distanceOnEarth(lat1, lng1, lat2, lng2) {
    let radius = 6371e3;
    let φ1 = toRadians(lat1)
    let φ2 = toRadians(lat2);
    let Δφ = toRadians(lat2-lat1);
    let Δλ = toRadians(lng2-lng1);

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return radius * c;
}