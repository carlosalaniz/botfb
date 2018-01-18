interface IMessageRepository<TMessageType> {
    sendAsync(message: TMessageType | TMessageType[]): any
}