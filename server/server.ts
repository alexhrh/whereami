'use strict';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import googleMaps from './googleMaps';

const app = express();

app.listen(3000, () => console.log('server started on port 3000'));

app.use(express.static('client'));
app.use(bodyParser.json());

app.post('/findplaces', (req, res) => {
    googleMaps.placesNearby({
        location: req.body.location,
        rankby: 'distance'
    })
        .then(places => res.send(places))
        .catch(console.log);
});