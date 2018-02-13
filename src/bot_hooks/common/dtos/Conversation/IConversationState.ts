import { MessageStatusEnum } from "./MessageStatusEnum";

export interface IUserConversationStates {
    user_id: string,
    states: {
        [application_id: string]: IConversationState
    }
}

export interface IConversationState {
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

