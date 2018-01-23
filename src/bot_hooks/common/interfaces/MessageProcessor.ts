import { json } from "web-request";
import { ServiceManager } from "../../../../config/ServiceManager";
var tokenMap = require("../../../../config/ActionMap.json");
var conversation = require("../../../../config/conversationMap.json");
var config = require('config');
interface IMessageProcessor {
    proccessAsync(data: IMessageEventDto): Promise<void>;
}
export abstract class MessageProcessor<TMessageType> implements IMessageProcessor {
    protected abstract createMessageFromString(stringMessage: string, recipientId: string): TMessageType;
    protected abstract addQuickReplies(message: TMessageType, quickReplies: any[]): void;
    protected conversationDefinition: IConversationDefinition;
    protected tokenActionMap: ITokenActionMap;
    protected messageRepo: IMessageRepository<any>;

    constructor(
    ) {
        this.conversationDefinition = conversation;
        this.tokenActionMap = tokenMap;
        this.messageRepo = ServiceManager.MessageRepository;
    }

    /**
     * Finds the first action token available and resturns it
     * @param text 
     */
    private searchForTokens(text: string, map: ITokenActionMap, match: boolean = false): string | null {
        var split = text.split(" ");
        if (split.length == 0) split = [text];
        for (var i = 0; i < split.length; i++) {
            var token = split[i].toLowerCase();
            if (map[token] != null) {
                if (typeof map[token] == "string") {
                    return <string>map[token];
                } else if (typeof map[token] == "object") {
                    return this.searchForTokens(text.replace(token, ""), <ITokenActionMap>map[token], true)
                }
            } else if (match && map[''] != null) {
                return <string>map[''];
            };
        };
        return null;
    }

    /**
     * parses a message and returns it's action
     * @param message 
     */
    protected getActionKey(message: IMessageEventDto): string | null {
        if (message.message != null && message.message.text != null) {
            var actionKey = this.searchForTokens(message.message.text, this.tokenActionMap);
            if (actionKey != null) {
                return actionKey;
            }
        }
        return null;
    }

    private getAction(actionKey: string): IAction | null {
        var action = this.conversationDefinition.actions[actionKey];
        if (action == null) return null;
        return action;
    }
    private GetMessage(action: IAction, conversationState: IConversationState): IMessage | null {
        if (conversationState.conversation != null) {
            var conversationIdx = conversationState.conversation;
            var conversation = action.conversation[conversationIdx];
            var messages: IMessage | undefined;
            if (conversationState.opening !== undefined && conversation.opening != undefined)
                messages = conversation.opening[conversationState.opening];
            else if (conversationState.questions !== undefined && conversation.questions != undefined) {
                messages = conversation.questions[conversationState.questions];
            }
            else if (conversationState.closing !== undefined && conversation.closing != undefined) {
                messages = conversation.closing[conversationState.closing];
            }
            if (messages != undefined) {
                return messages;
            }
        }
        return null;
    }
    private createMessageArrayFromStringArray(messages: string[], recipientId: string, senderId: number | string): TMessageType[] {
        var TMessageArr = [];
        for (var i = 0; i < messages.length; i++)
            TMessageArr.push(this.createMessageFromString(messages[i], recipientId));
        return TMessageArr;
    }

    async proccessAsync(data: IMessageEventDto) {
        ServiceManager.PersistanceService
        var actionKey = this.getActionKey(data);

        var messageTexts = ["not found"];
        var quickReplies = [];
        if (actionKey != null) {
            var action = this.getAction(actionKey);
            if (action) {
              var currentMessage = this.GetMessage(action, { opening: 0, conversation: 0 });
              if (currentMessage && currentMessage.messages) messageTexts = currentMessage.messages[Math.floor(Math.random() * (currentMessage.messages.length))];
              if (currentMessage && currentMessage.quick_replies) quickReplies = currentMessage.quick_replies;
            }
        }
        var messages = this.createMessageArrayFromStringArray(messageTexts, data.sender.id, data.recipient.id);
        this.addQuickReplies(messages[messages.length - 1], quickReplies);
        await this.messageRepo.sendAsync(messages);
    }
}