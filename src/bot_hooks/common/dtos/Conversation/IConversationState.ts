import { MessageStatusEnum } from "./MessageStatusEnum";

interface IUserConversationStates {
    user_id: string,
    states: {
        [application_id: string]: IConversationState
    }
}

interface IConversationState {
    application_id: string
    messageStatus?: MessageStatusEnum,
    action?: string,
    conversation?: number,
    opening?: number,
    questions?: number,
    closing?: number,
    awaiting_answer?: boolean,
    awaiting_confirmation?: boolean,
    payload?: Object
}

