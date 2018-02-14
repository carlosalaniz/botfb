interface   IAction {
    task: IActionTask | null,
    field:string | null,
    conversation: IConversation[],
    response?: {
        success?: IMessage[],
        error?: IMessage[],
    }
}