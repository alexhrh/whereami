export default function renderPlaces(places, element) {
    element.innerHTML = places
        .map(place => `<div>${place.name} at ${place.location.lat} ${place.location.lng}</div>`)
        .join('');
}