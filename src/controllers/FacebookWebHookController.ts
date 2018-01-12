import { Controller } from "./Controller";
import { FacebookMessageProcessor } from "../bot_hooks/facebook/handlers/FacebookMessageProcessor";
import { WebhookEventsEnum } from "../bot_hooks/facebook/common/enums/WebhookEventsEnum";
import { MessageReceivedEventHandler } from "../bot_hooks/facebook/handlers/MessageReceivedEventHandler";
import { MessageReadEventHandler } from "../bot_hooks/facebook/handlers/MessageReadEventHandler";

const request = require('request');
var config = require('config');

export class FacebookWebHookController extends Controller {
    private processor: IMessageProcessor;
    register(): void {
        this.app.get(this.routePrefix + '/',
            (req: any, res: any) => this.WebHookVerification(req, res));
        this.app.post(this.routePrefix + '/',
            (req: any, res: any) => this.PostCallback(req, res));
    }

    /**
     * Handles verification of facebook webhook 
     * @param req 
     * @param res 
     */
    WebHookVerification(req: any, res: any) {
        if (req.query['hub.verify_token'] === config.get("WebHookValidationToken")) {
            res.send(req.query['hub.challenge'])
        }
        res.send('Error, wrong token')
    };

    /**
     * Process facebook webhook callbacks
     * @param req 
     * @param res 
     */
    PostCallback(req: any, res: any) {
        try {
            this.processor.process(req.body);
        } catch (err) {
            console.log(err);
        }
        res.sendStatus(200)
    }

    constructor(app: any, routePrefix?: string) {
        if (routePrefix === undefined)
            routePrefix = "/webhook"
        super(app, routePrefix);
        this.processor = new FacebookMessageProcessor();
        this.processor.register(WebhookEventsEnum.messages, new MessageReceivedEventHandler());
        this.processor.register(WebhookEventsEnum.message_reads, new MessageReadEventHandler());
    }
}
