interface IMessageRepository<TMessageType> {
    sendAsync(message: TMessageType): any
}