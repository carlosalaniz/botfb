interface IEventsHandler {
    register<T>(eventType: string, eventHandler: IEventHandler<T>): void;
    handleAsync(message: any): Promise<void>
}