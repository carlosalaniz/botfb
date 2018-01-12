import { WebhookEventsEnum } from "../common/enums/WebhookEventsEnum";

"user strict"

export class FacebookMessageProcessor {
    private handlers: { [key: string]: IEventHandler<any> };

    constructor() {
        this.handlers = {};
    }

    private processEntries(entities: IEntry[]): void {
        var entity: IEntry;
        for (var i = 0; i < entities.length; i++) {
            entity = entities[i];
            for (var eventType in WebhookEventsEnum) {
                if ((<any>entity.messaging[0])[WebhookEventsEnum[eventType]] != undefined) {
                    if (this.handlers[eventType] != undefined) {
                        this.handlers[eventType].HandleAsync(entity.messaging);
                        break;
                    }
                    console.log(this.handlers);
                    console.error("No handler was registered for event type: " + eventType);
                }
            }
        }

    }

    register<T>(eventType: string, eventHandler: IEventHandler<T>) {
        this.handlers[eventType] = eventHandler;
    }

    process(message: IMessangerWebhookEvent) {
        //Do something with message
        console.log(message);
        //process entries
        this.processEntries(message.entry);
    }

}