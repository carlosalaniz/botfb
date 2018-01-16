"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Controller_1 = require("./Controller");
var FacebookEventsHandler_1 = require("../bot_hooks/facebook/handlers/FacebookEventsHandler");
var WebhookEventsEnum_1 = require("../bot_hooks/facebook/common/enums/WebhookEventsEnum");
var MessageReceivedEventHandler_1 = require("../bot_hooks/facebook/handlers/MessageReceivedEventHandler");
var MessageReadEventHandler_1 = require("../bot_hooks/facebook/handlers/MessageReadEventHandler");
var request = require('request');
var config = require('config');
var FacebookWebHookController = /** @class */ (function (_super) {
    __extends(FacebookWebHookController, _super);
    function FacebookWebHookController(app, routePrefix) {
        var _this = this;
        if (routePrefix === undefined)
            routePrefix = "/webhook";
        _this = _super.call(this, app, routePrefix) || this;
        _this.processor = new FacebookEventsHandler_1.FacebookEventsHandler();
        _this.processor.register(WebhookEventsEnum_1.WebhookEventsEnum.messages, new MessageReceivedEventHandler_1.MessageReceivedEventHandler());
        _this.processor.register(WebhookEventsEnum_1.WebhookEventsEnum.message_reads, new MessageReadEventHandler_1.MessageReadEventHandler());
        return _this;
    }
    FacebookWebHookController.prototype.register = function () {
        var _this = this;
        this.app.get(this.routePrefix + '/', function (req, res) { return _this.WebHookVerification(req, res); });
        this.app.post(this.routePrefix + '/', function (req, res) { return _this.PostCallback(req, res); });
    };
    /**
     * Handles verification of facebook webhook
     * @param req
     * @param res
     */
    FacebookWebHookController.prototype.WebHookVerification = function (req, res) {
        if (req.query['hub.verify_token'] === config.get("WebHookValidationToken")) {
            res.send(req.query['hub.challenge']);
        }
        res.send('Error, wrong token');
    };
    ;
    /**
     * Process facebook webhook callbacks
     * @param req
     * @param res
     */
    FacebookWebHookController.prototype.PostCallback = function (req, res) {
        try {
            this.processor.handle(req.body);
        }
        catch (err) {
            console.log(err);
        }
        res.sendStatus(200);
    };
    return FacebookWebHookController;
}(Controller_1.Controller));
exports.FacebookWebHookController = FacebookWebHookController;
