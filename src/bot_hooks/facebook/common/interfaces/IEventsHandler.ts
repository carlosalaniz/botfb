interface IEventsHandler {
    register<T>(eventType: string, eventHandler: IEventHandler<T>): void;
    handle(message: any): void
}