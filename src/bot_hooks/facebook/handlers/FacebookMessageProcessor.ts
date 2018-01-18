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
                text: <string>action
            }
        };
        if (action != null) {
            var messages = [
                message,
                {
                    sender: {
                        id: config.get("FacebookPageId")
                    },
                    recipient: data.sender,
                    message: {
                        text: "1"
                    }
                },
                {
                    sender: {
                        id: config.get("FacebookPageId")
                    },
                    recipient: data.sender,
                    message: {
                        text: "2"
                    }
                },
                {
                    sender: {
                        id: config.get("FacebookPageId")
                    },
                    recipient: data.sender,
                    message: {
                        text: "3"
                    }
                },
                {
                    sender: {
                        id: config.get("FacebookPageId")
                    },
                    recipient: data.sender,
                    message: {
                        text: "4"
                    }
                }
            ]
            await this.messageRepo.sendAsync(messages)
        } else {
            message.message.text = "hi!";
            await this.messageRepo.sendAsync(message)
        }
    }

}