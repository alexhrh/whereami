import PlacesController from './places/PlacesController';

document.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    const [searchElem, resultElem] = document.getElementById('google-map').querySelectorAll('div');
    const placesController = new PlacesController(searchElem, resultElem);
});