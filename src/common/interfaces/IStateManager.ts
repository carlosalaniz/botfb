import { MessageStatusEnum } from "../../bot_hooks/common/dtos/Conversation/MessageStatusEnum";
import { IConversationState } from "../../bot_hooks/common/dtos/Conversation/IConversationState";

enum confimationResponse {
    confirm = "yes",
    decline = "no",
}

export interface IStateManager {
    persistance: IPersistance;
    getCurrentStateStatusAsync(userId: string, appId: string | undefined): Promise<MessageStatusEnum | null>;
    getCurrentStateAsync(userId: string, appId: string | undefined): Promise<IConversationState>;
    setUserStateAsync(userId: string, appId: string, state: IConversationState): Promise<void>;
    resetUserStateAsync(userId: string, appId: string): Promise<void>;
}