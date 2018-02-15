import { MessageStatusEnum, ConversationTypesEnum } from "./MessageStatusEnum";

export interface IUserConversationStates {
    user_id: string,
    states: {
        [application_id: string]: IConversationState
    }
}


export interface IConversationState {
    application_id: string,
    action?: {
        id: string,
        conversation: {
            indx: number,
            state: {
                type: ConversationTypesEnum
                awaiting: {
                    confirmation: boolean,
                    input: boolean,
                },
                indx: number
            }
        },
        payload: object
    }
}

