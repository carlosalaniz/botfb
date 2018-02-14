import { json } from "web-request";
import { ContextManager } from "../../../../config/ContextManager";
import { IConversationState } from "../dtos/Conversation/IConversationState";
import { Exception } from "handlebars";
import { StateManager } from "../../../common/StateManager";
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
        this.messageRepo = ContextManager.MessageRepository;
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
    private existsAndisInRange(arr: any[] | any, indx: any): boolean {
        return Array.isArray(arr)
            && indx != null
            && indx != undefined
            && arr[indx] != null
            && arr[indx] != undefined;
    }
    private GetMessage(action: IAction, conversationState: IConversationState): IMessage | null {
        //Getting current state
        var userId = ContextManager.userId;
        var appId = ContextManager.appId;
        if (conversationState.conversation != null) {
            var conversationIdx = conversationState.conversation;
            var conversation = action.conversation[conversationIdx];
            var messages: IMessage | undefined;
            if (this.existsAndisInRange(conversation.opening, conversationState.opening)) {
                let indx = <number>conversationState!.opening;
                messages = conversation.opening[indx];
                indx++;
                conversationState.opening = indx;
            }
            else if (conversationState.questions !== undefined && conversation.questions != undefined) {
                let indx = <number>conversationState!.questions;
                messages = conversation.questions[indx];
                indx++;
                conversationState.questions = indx;
            }
            else if (conversationState.closing !== undefined && conversation.closing != undefined) {
                messages = conversation.closing[conversationState.closing];
            }
        }
        ContextManager.StateManager.setUserStateAsync(userId, appId, conversationState);
        return (messages != undefined) ? messages : null;
    }
    private createMessageArrayFromStringArray(messages: string[], recipientId: string, senderId: number | string): TMessageType[] {
        var TMessageArr = [];
        for (var i = 0; i < messages.length; i++)
            TMessageArr.push(this.createMessageFromString(messages[i], recipientId));
        return TMessageArr;
    }


    async processAction(data: IMessageEventDto,
        currentState: IConversationState): Promise<TMessageType[]> {
        //Getting current state
        let userId = ContextManager.userId;
        let appId = ContextManager.appId;

        //If action key is not defined, try to find it 
        var actionKey = (currentState.action == null) ? this.getActionKey(data) : currentState.action;

        //Default message todo: Change
        var messageTexts = ["not found"];
        var quickReplies = [];

        //if action key then process action
        if (actionKey != null) {
            let action = this.getAction(actionKey);
            if (action) {
                currentState.action = actionKey;
                // Persist State
                await ContextManager.StateManager.setUserStateAsync(userId, appId, currentState);
                var currentMessage = this.GetMessage(action, currentState);
                if (currentMessage && currentMessage.messages)
                    messageTexts = currentMessage.messages[Math.floor(Math.random() * (currentMessage.messages.length))];
                if (currentMessage && currentMessage.quick_replies) quickReplies = currentMessage.quick_replies;
            } else {
                throw Exception("Action Key: " + actionKey + " is not defined in conversation map for appId: " + appId);
            }
        }
        var messages = this.createMessageArrayFromStringArray(messageTexts, data.sender.id, data.recipient.id);
        this.addQuickReplies(messages[messages.length - 1], quickReplies);
        return messages;
    }



    async proccessAsync(data: IMessageEventDto) {
        let appId = data.recipient.id;
        let userId = data.sender.id;
        var currentState = await ContextManager.StateManager.getCurrentStateAsync(userId, appId);
        switch (currentState.action) {
            case undefined:
            case null:
                var messages = this.processAction(data, currentState);
                break;
            default:
                var messages = this.processAction(data, currentState);
        }
        currentState = await ContextManager.StateManager.getCurrentStateAsync(userId, appId);

        await ContextManager.StateManager.getCurrentStateAsync(userId, appId);

        await this.messageRepo.sendAsync(messages);
    }
}