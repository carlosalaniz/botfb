import { Controller } from "./Controller";
import { FacebookEventsHandler } from "../bot_hooks/facebook/handlers/FacebookEventsHandler";
import { WebhookEventsEnum } from "../bot_hooks/facebook/common/enums/WebhookEventsEnum";
import { MessageReceivedEventHandler } from "../bot_hooks/facebook/handlers/MessageReceivedEventHandler";
import { MessageReadEventHandler } from "../bot_hooks/facebook/handlers/MessageReadEventHandler";
import { ServiceManager } from "../../config/ServiceManager";

const request = require('request');
var config = require('config');

export class FacebookWebHookController extends Controller {
    private processor: IEventsHandler;
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
        console.log(req);
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
        this.processor.handleAsync(req.body).catch(function (err) {
            res.sendStatus(500)
            console.log(err);
        }).then(function (result) {
            res.sendStatus(200)
        });
    }

    constructor(app: any, routePrefix: string) {
        if (routePrefix == null)
            routePrefix = "/facebook-webhook"
        super(app, routePrefix);
        this.processor = new FacebookEventsHandler();
        this.processor.register(WebhookEventsEnum.messages, new MessageReceivedEventHandler());
        this.processor.register(WebhookEventsEnum.message_reads, new MessageReadEventHandler());
    }
}
