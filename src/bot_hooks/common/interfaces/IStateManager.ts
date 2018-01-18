interface IStateManager {
    persistance: IPersistance;
    updateStateAsync(data: IMessage): Promise<void>;
    getStateAsync(data: IMessage): Promise<IConversationState>
}