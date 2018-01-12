import { WebhookEventsEnum } from "../common/enums/WebhookEventsEnum";

"user strict"

export class FacebookMessageProcessor implements IMessageProcessor {
    private handlers: { [key: string]: IEventHandler<any> };

    constructor() {
        this.handlers = {};
    }

    private processEntries(entities: IEntry[]) {
        var entity: IEntry;
        for (var i = 0; i < entities.length; i++) {
            entity = entities[i];
            for (var eventTypeKey in WebhookEventsEnum) {
                var eventType = WebhookEventsEnum[eventTypeKey];
                if ((<any>entity.messaging[0])[eventType] != undefined) {
                    if (this.handlers[eventType] != undefined) {
                        this.handlers[eventType].Handle(entity.messaging[0]);
                        break;
                    }
                    console.error("No handler was registered for event type: " + eventType);
                }
            }
        }

    }

    register<T>(eventType: string, eventHandler: IEventHandler<T>) {
        this.handlers[eventType] = eventHandler;
    }

    process(message: any) {
        //Do something with message

        //process entries
        this.processEntries(message.entry);
    }

}