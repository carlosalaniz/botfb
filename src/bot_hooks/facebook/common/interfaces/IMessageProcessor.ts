interface IMessageProcessor {
    register<T>(eventType: string, eventHandler: IEventHandler<T>): void;
    process(message: any): void
}