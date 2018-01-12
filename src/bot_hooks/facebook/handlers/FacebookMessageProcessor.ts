import { WebhookEventsEnum } from "../common/enums/WebhookEventsEnum";

"user strict"

export class FacebookMessageProcessor {
    private handlers: { [key: string]: IEventHandler<any> };

    constructor() {
        this.handlers = {};
    }

    private async processEntriesAsync(entities: IEntry[]) {
        var entity: IEntry;
        for (var i = 0; i < entities.length; i++) {
            entity = entities[i];
            for (var eventTypeKey in WebhookEventsEnum) {
                var eventType = WebhookEventsEnum[eventTypeKey];
                if ((<any>entity.messaging[0])[eventType] != undefined) {
                    if (this.handlers[eventType] != undefined) {
                        await this.handlers[eventType].HandleAsync(entity.messaging[0]);
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

    async processAsync(message: IMessangerWebhookEvent) {
        //Do something with message
        
        //process entries
        await this.processEntriesAsync(message.entry);
    }

}