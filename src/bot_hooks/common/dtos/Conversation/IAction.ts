interface IAction {
    task: IActionTask | null,
    conversation?: IConversation[],
    response?: {
        success?: IMessage[],
        error?: IMessage[],
    }
}