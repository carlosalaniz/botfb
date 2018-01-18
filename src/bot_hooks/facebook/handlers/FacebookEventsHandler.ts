import { WebhookEventsEnum } from "../common/enums/WebhookEventsEnum";

"user strict"

export class FacebookEventsHandler implements IEventsHandler {
    private handlers: { [key: string]: IEventHandler<any> };

    constructor() {
        this.handlers = {};
    }

    private async processEntriesAsync(entities: IEntryDto[]) {
        var entity: IEntryDto;
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

    async handleAsync(message: any) {
        //Do something with message

        //process entries
        await this.processEntriesAsync(message.entry);
    }

}