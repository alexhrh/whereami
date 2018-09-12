import PlaceModel from '../models/Place.model';
import HTTPMethods from './HTTPMethods';

async function getPlaces(params) {
    const places = await HTTPMethods.post('/findplaces', params);
    return places.map(place => {
        return new PlaceModel(place);
    });
}

const PlacesService = {
    getPlaces
};

export default PlacesService;