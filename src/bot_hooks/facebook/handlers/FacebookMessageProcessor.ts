import { MessageProcessor } from "../../common/interfaces/MessageProcessor";
import { ServiceManager } from "../../../../config/ServiceManager";


var config = require('config');
export class FacebookMessageProcessor extends MessageProcessor<IMessageDto>{
    protected createMessageFromString(stringMessage: string, recipientId: string | number, senderId: string | number): IMessageDto {
        var message: IMessageDto = {
            sender: {
                id: config.get("FacebookPageId")
            },
            recipient: {
                id: recipientId.toString()
            },
            message: {
                text: stringMessage
            }
        };
        return message;
    }


    persistance: IPersistance;
    constructor() {
        super();
        this.persistance = ServiceManager.PersistanceService;
    }

}