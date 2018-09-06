'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser'

import placesNearby from './placesNearby';

const app = express();

app.listen(3000, () => console.log('server started on port 3000'));

app.use(express.static('client'));
app.use(bodyParser.json());

app.post('/findplaces', (req, res) => {
    placesNearby(req.body.location)
        .then(places => res.send(places))
        .catch(console.log);
});