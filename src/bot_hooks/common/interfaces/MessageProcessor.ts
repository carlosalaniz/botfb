import { json } from "web-request";
import { ServiceManager } from "../../../../config/ServiceManager";
var tokenMap = require("../../../../config/ActionMap.json");
var conversation = require("../../../../config/conversationMap.json");


export abstract class MessageProcessor<TMessageType> {
    abstract createMessageFromString(stringMessage: string, message: IMessageDto): TMessageType;

    protected conversationDefinition: IConversationDefinition;
    protected tokenActionMap: ITokenActionMap;
    protected messageRepo: IMessageRepository<any>;
    private CMFS(stringMessage: string, message: IMessageDto): TMessageType {
        return this.createMessageFromString(stringMessage, message);
    };

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
        console.log(split);
        for (var i = 0; i < split.length; i++) {
            var token = split[i].toLowerCase();
            console.log(map[token]);
            if (map[token] != null) {
                if (typeof map[token] == "string") {
                    console.log("returning")
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
    protected getAction(message: IMessageDto): IAction | null | string {
        if (message.message != null && message.message.text != null) {
            var actionKey = this.searchForTokens(message.message.text, this.tokenActionMap);
            console.log(actionKey);
            if (actionKey != null) {
                return actionKey;
            }
        }
        return null;
    }
}
