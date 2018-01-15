interface IMessageRepository<TMessageType> {
    sendAsync(message: TMessageType): Promise<void>
}