import { ServiceManager } from "../../config/ServiceManager";

export class StateManager implements IStateManager {
    persistance: IPersistance;
    constructor() {
        this.persistance = ServiceManager.PersistanceService;
    }
    async getCurrentStateStatusAsync(userId: string, appId: string): Promise<MessageStatusEnum | null> {
        var userAppState = await this.getCurrentStateAsync(userId, appId);
        if (userAppState != null) {
            if (userAppState.messageStatus != null) return userAppState.messageStatus;
        }
        return null;
    }
    async getCurrentStateAsync(userId: string, appId: string): Promise<IConversationState | null> {
        var userStatesJson: string | null | undefined = await this.persistance.getAsync(userId);
        if (userStatesJson != null) {
            var userStates: IUserConversationStates = JSON.parse(userStatesJson);
            if (userStates.states[appId] != null) {
                if (userStates.states[appId] != null) {
                    return userStates.states[appId];
                }
            }
        }
        return null;
    }

    async setUserStateAsync(userId: string, appId: string, state: IConversationState): Promise<any> {
        var userStates: IUserConversationStates = {
            user_id: userId,
            states: {}
        }
        userStates.states[state.application_id] = state;
        var set = await this.persistance.setAsync(userId, userStates);
        return set;
    }
}