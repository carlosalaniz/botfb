import { Controller } from "./Controller";
const request = require('request');

export class WebHookController extends Controller {
    register(): void {
        this.app.post('/webhook/', this.postHandleBotRequest);
    }
    private postHandleBotRequest(req: any, res: any) {
        let messaging_events = req.body.entry[0].messaging
        console.log(JSON.stringify(req.body));
        for (let i = 0; i < messaging_events.length; i++) {
            let event = req.body.entry[0].messaging[i]
            let sender = event.sender.id
            if (event.message && event.message.text) {
                let text = event.message.text
                this.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
            }
        }
        res.sendStatus(200)
    }
    private sendTextMessage(sender: any, text: any) {
        let messageData = { text: text }
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: "s" },
            method: 'POST',
            json: {
                recipient: { id: sender },
                message: { text: "SOME MEESAGE " },
            }
        }, function (error: any, response: any, body: any) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
        })
    }
}
