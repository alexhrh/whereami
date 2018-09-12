'use strict';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import findPlaces from './endpoints/FindPlaces';

const clientDir = 'client-dist';

const app = express();
app.listen(3000, () => console.log('server started on port 3000'));
app.use(express.static(clientDir));
app.use(bodyParser.json());

app.post('/findplaces', findPlaces);