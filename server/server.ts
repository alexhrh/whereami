'use strict';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import googleMaps from './googleMaps';
import distanceOnEarth from './distanceOnEarth';

const clientDir = 'client-dist';

const app = express();
app.listen(3000, () => console.log('server started on port 3000'));
app.use(express.static(clientDir));
app.use(bodyParser.json());

app.post('/findplaces', (req, res) => {
    let [lat, lng] = req.body.location.trim().split(' ');
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    googleMaps.placesNearby({
        location: req.body.location,
        rankby: req.body.rankby || 'distance'
    })
        .then(places => {

            const placesShort = places.results.map(place => ({
                name: place.name,
                location: place.geometry.location,
                distance: distanceOnEarth(lat, lng,
                    place.geometry.location.lat, place.geometry.location.lng)
            }));

            res.send(placesShort);
        })
        .catch(err => {
            console.log(err);
        });
});