import { MessageReadEventHandler } from './src/bot_hooks/facebook/handlers/MessageReadEventHandler';
'use strict'
import { UserProfileHandler } from "./src/bot_hooks/facebook/repositories/UserProfileHandler";
import { TestController } from "./src/controllers/TestController";
import { FacebookMessageProcessor } from "./src/bot_hooks/facebook/handlers/FacebookMessageProcessor";
import { eventNames } from "cluster";
import { MessageReceivedEventHandler } from "./src/bot_hooks/facebook/handlers/MessageReceivedEventHandler";
import { WebhookEventsEnum } from "./src/bot_hooks/facebook/common/enums/WebhookEventsEnum";
var config = require('config');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())


new TestController(app).register();

// Index route
app.get('/', function (req: any, res: any) {
	res.send('we are up')
})


// for Facebook verification
app.get('/webhook/', function (req: any, res: any) {
	if (req.query['hub.verify_token'] === config.get("WebHookValidationToken")) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook/', async function (req: any, res: any)  {
	var processor = new FacebookMessageProcessor();
	//console.log(WebhookEventsEnum.messages);
	processor.register(WebhookEventsEnum.messages, new MessageReceivedEventHandler());
	processor.register(WebhookEventsEnum.message_reads, new MessageReadEventHandler());
	await processor.processAsync(<IMessangerWebhookEvent>req.body);
	res.sendStatus(200)
})


// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})