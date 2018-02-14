import { ContextManager } from "../../config/ContextManager";
import { MessageStatusEnum } from "../bot_hooks/common/dtos/Conversation/MessageStatusEnum";
import { IStateManager } from "./interfaces/IStateManager";
import { IUserConversationStates } from "../bot_hooks/common/dtos/Conversation/IConversationState";
import { IConversationState } from "../bot_hooks/common/dtos/Conversation/IConversationState";

export class StateManager implements IStateManager {
    persistance: IPersistance;
    constructor() {
        this.persistance = ContextManager.PersistanceService;
    }
    async getCurrentStateStatusAsync(userId: string, appId: string): Promise<MessageStatusEnum | null> {
        var userAppState = await this.getCurrentStateAsync(userId, appId);
        if (userAppState != null) {
            if (userAppState.messageStatus != null) return userAppState.messageStatus;
        }
        return null;
    }
    async getCurrentStateAsync(userId: string, appId: string): Promise<IConversationState> {
        var userStatesJson: string | null | undefined = await this.persistance.getAsync(userId);
        if (userStatesJson != null) {
            var userStates: IUserConversationStates = JSON.parse(userStatesJson);
            if (userStates.states[appId] != null) {
                if (userStates.states[appId] != null) {
                    return userStates.states[appId];
                }
            }
        }
        return await this.setUserStateAsync(userId, appId, { application_id: appId });
    }

    async setUserStateAsync(userId: string, appId: string, state: IConversationState): Promise<any> {
        var userStates: IUserConversationStates = {
            user_id: userId,
            states: {}
        }
        userStates.states[state.application_id] = state;
        var set = await this.persistance.setAsync(userId, userStates);
        if (set == "OK") {
            return userStates.states[state.application_id];
        }
        return {};
    }
}