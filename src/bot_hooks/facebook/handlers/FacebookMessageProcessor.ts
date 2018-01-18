import { MessageProcessor } from "../../common/interfaces/MessageProcessor";
import { ServiceManager } from "../../../../config/ServiceManager";


var config = require('config');
export class FacebookMessageProcessor extends MessageProcessor<IMessageDto>{
    persistance: IPersistance;
    constructor() {
        super();
        this.persistance = ServiceManager.PersistanceService;
    }
    protected createMessageFromString(stringMessage: string, recipient: { id: "string" }): IMessageDto {
        var message: IMessageDto = {
            sender: {
                id: config.get("FacebookPageId")
            },
            recipient: recipient,
            message: {
                text: stringMessage
            }
        };
        return message;
    }
}