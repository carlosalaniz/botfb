import { ContextManager } from "./config/ContextManager";
import { IConversationState } from "./src/bot_hooks/common/dtos/Conversation/IConversationState";

var userId = ContextManager.setUserId("1");
var appId = ContextManager.setAppId("TESTAPP");
var currentObjHierarchy: string[] = [];
var dtoObject: {
    [key: string]: any
} = {};

function processInputIntoDto(newValue: [string, any]) {
    let hierarchy = currentObjHierarchy;
    let obj = dtoObject;
    for (let i = 0, key = hierarchy[i]; i < hierarchy.length; i++ , key = hierarchy[i]) {
        if (obj[key] == null) obj[key] = {};
        obj = obj[key];
    }
    obj[newValue[0]] = newValue[1];
}


function processMessage(message: IMessage) {
    // do something with messages
}

/**
 * 
 * @param input yes|no|open string
 * @param state 
 * @param cMap 
 */
function proccessInput(input: string, state: IConversationState, cMap: IConversationDefinition) {
    const awaiting = state.action.conversation.awaiting;
    const actionIndx: string = <string>state.action.id;
    const conversationIndx: number = <number>state.action.conversation.indx;
    const action = cMap.actions[actionIndx];
    const conversation = action.conversation[conversationIndx];
    const conversationType = state.action.conversation.state.type;
    const messageIndx = state.action.conversation.state.indx;

    //Try to start conversation
    let messages = <IMessage[]>conversation[conversationType];
    var message = messages[messageIndx];

    if (!awaiting.confirmation && !awaiting.input) {
        let fieldKey = action.field;
        if (fieldKey) {
            currentObjHierarchy.push(fieldKey);
        }
    } else if (awaiting.input) {
        let fieldKey = <string>conversation.field;
        processInputIntoDto([fieldKey, input]);
    } else if (awaiting.confirmation) {
        var confirmation: IConfirmation | null = null;
        switch (input) {
            case "yes":
                confirmation = <IConfirmation>message.confirm;
                break;
            case "no":
                confirmation = <IConfirmation>message.decline;
                break;
        }
        if (confirmation) {
            message = <IMessage>confirmation.message;
            if (confirmation.continue) { }
            else if (confirmation.exit) { }
            else if (confirmation.reiterate) { }
            else if (confirmation.reset) { }
        }
    }

    processMessage(message);
    return true;
}

function updateState(state: IConversationState) {

}

function procesS(input: string, state: IConversationState) {
    let cmap: IConversationDefinition = {};
    if (proccessInput(input, state, cmap)) {
        updateState(state);
    }
}

