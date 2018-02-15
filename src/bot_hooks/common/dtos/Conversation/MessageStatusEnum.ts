export enum MessageStatusEnum {
    message_sent = "message_sent",
    message_recieved = "message_recieved",
    message_read = "message_read",
    awaiting_response = "awaiting_response",
    message_delivered = "message_delivered",    
    awaiting_confirmation = "awaiting_confirmation",
}

export enum ConversationTypesEnum{
    opening = "opening",
    questions = "questions",
    closing = "closing",
    end = "do_not_process"
}