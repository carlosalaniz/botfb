import { MessageProcessor } from "../../common/interfaces/MessageProcessor";
import { ContextManager } from "../../../../config/ContextManager";


var config = require('config');
export class FacebookMessageProcessor extends MessageProcessor<ISendMessageDto<any>>{
    createMessageFromString(stringMessage: string, recipientId: string): ISendMessageDto<ITextMessageDto> {
        var message: ISendMessageDto<ITextMessageDto> = {
            recipient: {
                id: recipientId.toString()
            },
            message: {
                text: stringMessage
            }
        };
        return message;
    }
    addQuickReplies(message: object & (ISendMessageDto<ITextMessageDto> | ISendMessageDto<IAttachmentMessageDto>), quickReplies: IQuickReplySendDto[]) {
      if(quickReplies.length === 0) return;
      message.message.quick_replies = quickReplies;
    }
    persistance: IPersistance;
    constructor() {
        super();
        this.persistance = ContextManager.PersistanceService;
    }
}