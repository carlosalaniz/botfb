import { MessageStatusEnum, ConversationTypesEnum } from "./MessageStatusEnum";

export interface IUserConversationStates {
    user_id: string,
    states: {
        [application_id: string]: IConversationState
    }
}


export interface IConversationState {
    application_id: string,
    action: {
        id: string,
        conversation: {
            awaiting: {
                confirmation: boolean,
                input: boolean,
            },
            indx: number,
            state: {
                type: ConversationTypesEnum
                indx: 0
            }
        },
        payload?: object
    }
}

