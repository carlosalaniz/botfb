import { RedisPersistance } from './src/common/RedisPersistance';

'use strict'

import { HomeController } from "./src/controllers/HomeController";
import { FacebookWebHookController } from './src/controllers/FacebookWebHookController';

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = new RedisPersistance();

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

//Controller registration
new HomeController(app)
	.register();

new FacebookWebHookController(app, "/facebook-webhook")
	.register();

// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})