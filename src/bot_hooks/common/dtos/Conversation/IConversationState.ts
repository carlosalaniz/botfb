import { PassThrough } from "stream";

interface IConversationState {
    user_id: string,
    states: {
        application_id: string
        action: string,
        conversation?: number,
        opening?: number,
        questions?: number,
        awaiting_answer: boolean,
        awaiting_confirmation: boolean,
        payload: Object
    }[]
}