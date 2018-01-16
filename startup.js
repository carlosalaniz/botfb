'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var HomeController_1 = require("./src/controllers/HomeController");
var FacebookWebHookController_1 = require("./src/controllers/FacebookWebHookController");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', (process.env.PORT || 5000));
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Process application/json
app.use(bodyParser.json());
//Controller registration
new HomeController_1.HomeController(app)
    .register();
new FacebookWebHookController_1.FacebookWebHookController(app, "/facebook-webhook")
    .register();
// Spin up the server
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'));
});
