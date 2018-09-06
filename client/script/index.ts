import getPlaces from './getPlaces';
import renderPlaces from './renderPlaces';

const getElement = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("search").addEventListener("click", () => {

        getPlaces(getElement('location').value)
            .then(places => renderPlaces(places, getElement('result')))
            .catch(console.log);
    });
});