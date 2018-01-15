import { json } from "web-request";

export abstract class MessageProcessor<TMessageType> {
    abstract createMessageFromString(stringMessage: string): TMessageType;

    protected conversationDefinition: IConversationDefinition;
    protected tokenActionMap: ITokenActionMap;
    protected messageRepo: IMessageRepository<TMessageType>;
    private CMFS(stringMessage: string): TMessageType {
        return this.createMessageFromString(stringMessage);
    };

    constructor(
        conversationDefinition: IConversationDefinition,
        tokenActionMap: ITokenActionMap,
        messageRepo: IMessageRepository<TMessageType>
    ) {
        this.conversationDefinition = conversationDefinition;
        this.tokenActionMap = tokenActionMap;
        this.messageRepo = messageRepo;
    }


    /**
     * Finds the first action token available and resturns it
     * @param text 
     */
    private searchForTokens(text: string): string | null {
        text.split(" ").forEach(token => {
            if (this.tokenActionMap[token] != null) {
                return token;
            }
        });
        return null;
    }

    /**
     * parses a message and returns it's action
     * @param message 
     */
    private getAction(message: string): IAction | null {
        var token = this.searchForTokens(message);
        if (token != null) {
            var actionIdentifier = this.tokenActionMap[token];
            return this.conversationDefinition.actions[actionIdentifier];
        } else {
            //todo: localization
            this.messageRepo.sendAsync(this.CMFS(JSON.stringify("I couldn't understand that message")))
                .catch(err => console.log(err));
        }
        return null;
    }


}
