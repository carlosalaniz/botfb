import { ContextManager } from "./config/ContextManager";
import { IConversationState } from "./src/bot_hooks/common/dtos/Conversation/IConversationState";
import { ConversationTypesEnum } from "./src/bot_hooks/common/dtos/Conversation/MessageStatusEnum";

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
    if (!state.action) return;
    const actionIndx = state.action.id;
    const action = cMap.actions[actionIndx];

    const conversationIndx = state.action.conversation.indx;
    const conversation = action.conversation[conversationIndx];
    const conversationType = state.action.conversation.state.type;
    const awaiting = state.action.conversation.state.awaiting;


    //Try to start conversation
    const messageIndx = state.action.conversation.state.indx;
    let messages = conversation[conversationType]; // opening, questions closing, end

    var message = <IMessage[] | undefined>messages[messageIndx];
    if (!message) {
        //If no more messages advance to next conversation state
        let next = {
            type: conversationType,
            indx: 0,
            awaiting: {
                confirmation: false,
                input: false
            }
        };
        switch (conversationType) {
            case ConversationTypesEnum.opening:
                next.type = ConversationTypesEnum.questions;
                break;
            case ConversationTypesEnum.questions:
                next.type = ConversationTypesEnum.closing;
                break;
            case ConversationTypesEnum.closing:
                next.type = ConversationTypesEnum.end;
                break;
        }
        //advance to next conservsation Type
        state.action.conversation.state = next;
        return;
    }


    //Process Message
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
            else if (confirmation.exit) {
                state.action = undefined;
            }
            else if (confirmation.reiterate) {
                state.action.conversation.state.indx = 0;
            }
            else if (confirmation.reset) {
                state.action.conversation.state.type = ConversationTypesEnum.opening;
                state.action.conversation.state.indx = 0;
            }
        }
    }

    processMessage(message);

    return true;
}

function isValidAction(input: string): boolean {
    return true;
}

function process(input: string, state: IConversationState, cMap: IConversationDefinition) {
    if (!state.action) {

        if (!isValidAction(input)) return;
        state.action = {
            id: input,
            conversation: {
                indx: 0,
                state: {
                    indx: 0,
                    type: ConversationTypesEnum.opening,
                    awaiting: {
                        confirmation: false,
                        input: false
                    },
                }
            },
            payload: {}
        }
        proccessInput(input, state, cMap)
    }
}

