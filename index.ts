'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const token = "my_voice_is_my_password_verify_me";
const pageToken = "EAALLR4U3dNsBAG3ZCklmNRXDNoMyrT91MK6bW3so7hRYX6uHR0WRUHI3LAJbEcetOpGAkQmPWBkJISlPbszZCSPxW5qYF0KKRgVxNQ3nU9J8WgbBAnj6ndvBdi6ZBzHAkbZBInvmK3udVvDmXXQyxPIx2XnIDYKka2BVkpiVmXcFSplLkhVPwYGMRMbeafAZD";


app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req : any, res : any) {
	res.send('some')
})

// for Facebook verification
app.get('/webhook/', function (req : any, res : any) {
	if (req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook/', function (req : any, res: any) {
	let messaging_events = req.body.entry[0].messaging
	console.log(JSON.stringify(req.body));
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
	}
	res.sendStatus(200)
})

function sendTextMessage(sender : any, text: any) {
	let messageData = { text: text }
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: pageToken },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: {text:"SOME MEESAGE "},
		}
	}, function (error : any, response: any, body: any) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})