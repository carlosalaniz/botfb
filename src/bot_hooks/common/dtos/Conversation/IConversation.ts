interface IConversation {
    field?: string;
    opening: IMessage[],
    questions?: IMessage[],
    closing?: IMessage[],
    [key: string]: IMessage[] | undefined | string
}
