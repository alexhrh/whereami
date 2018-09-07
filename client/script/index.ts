import getPlaces from './getPlaces';
import renderPlaces from './renderPlaces';

const getElement = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {

    getElement("search").addEventListener('click', () => {

        // @ts-ignore
        getPlaces(getElement('location').value)
            .then(places => renderPlaces(places, getElement('result')))
            .catch(console.log);
    });
});