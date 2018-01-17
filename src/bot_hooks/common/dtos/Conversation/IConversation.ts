interface IConversation {
    field?: string | null;
    opening: IMessage[],
    questions?: IMessage[],
    closing?: IMessage[]
}
