import { MessageProcessor } from "../../common/interfaces/MessageProcessor";
var config = require('config');
export class FacebookMessageProcessor extends MessageProcessor<IMessageDto>{
    createMessageFromString(stringMessage: string, message: IMessageDto): IMessageDto {
        var message: IMessageDto = {
            sender: {
                id: config.get("FacebookPageId")
            },
            recipient: message.recipient,
            message: {
                text: stringMessage
            }
        };
        return message;
    }
    async proccessAsync(data: IMessageDto) {
        var action = this.getAction(data);
        var message: IMessageDto = {
            sender: {
                id: config.get("FacebookPageId")
            },
            recipient: data.sender,
            message: {
                text: JSON.stringify(action)
            }
        };
        if (action != null) {
            await this.messageRepo.sendAsync(message)
        } else {
            message.message.text = "hi!";
            await this.messageRepo.sendAsync(message)
        }
    }

}