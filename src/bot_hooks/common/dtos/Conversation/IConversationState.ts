interface IConversationState {
    user_id: string,
    states: {
        application_id: string
        messageStatus: MessageStatusEnum,
        action: string,
        conversation?: number,
        opening?: number,
        questions?: number,
        awaiting_answer: boolean,
        awaiting_confirmation: boolean,
        payload: Object
    }[]
}

