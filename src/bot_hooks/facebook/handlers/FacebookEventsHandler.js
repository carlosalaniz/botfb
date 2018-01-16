"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebhookEventsEnum_1 = require("../common/enums/WebhookEventsEnum");
"user strict";
var FacebookEventsHandler = /** @class */ (function () {
    function FacebookEventsHandler() {
        this.handlers = {};
    }
    FacebookEventsHandler.prototype.processEntries = function (entities) {
        var entity;
        for (var i = 0; i < entities.length; i++) {
            entity = entities[i];
            for (var eventTypeKey in WebhookEventsEnum_1.WebhookEventsEnum) {
                var eventType = WebhookEventsEnum_1.WebhookEventsEnum[eventTypeKey];
                if (entity.messaging[0][eventType] != undefined) {
                    if (this.handlers[eventType] != undefined) {
                        this.handlers[eventType].Handle(entity.messaging[0]);
                        break;
                    }
                    console.error("No handler was registered for event type: " + eventType);
                }
            }
        }
    };
    FacebookEventsHandler.prototype.register = function (eventType, eventHandler) {
        this.handlers[eventType] = eventHandler;
    };
    FacebookEventsHandler.prototype.handle = function (message) {
        //Do something with message
        //process entries
        this.processEntries(message.entry);
    };
    return FacebookEventsHandler;
}());
exports.FacebookEventsHandler = FacebookEventsHandler;
