import GoogleMaps from '../services/GoogleMaps';
import GeoCoords from '../helpers/GeoCoords';
import Place from '../models/Place';


export default function findPlaces(req, res) {
    const location = GeoCoords.parseCoords(req.body.location);

    if (req.body.query === '') {
        nearbySearch(req, res);
    } else {
        textSearch(req, res);
    }
}

function nearbySearch(req, res) {
    const location = GeoCoords.parseCoords(req.body.location);

    GoogleMaps.nearbySearchAll(Object.assign({
        rankby: 'distance'
    }, req.body))
        .then(mapResponses => {
            res.send(aggregatePlaces(mapResponses, location));
        })
        .catch(err => {
            console.log(err);
        });
}

function textSearch(req, res) {
    const location = GeoCoords.parseCoords(req.body.location);

    GoogleMaps.textSearchAll({

    })
        .then(mapResponses => {

        })
        .catch(err => {
            console.log(err);
        });
}

function aggregatePlaces(mapResponses, location) {
    let placeList = [];

    mapResponses.forEach(mapResponse => {
        mapResponse.results.forEach(place => {
            placeList.push( new Place(place, {location}) );
        });
    });

    return placeList;
}