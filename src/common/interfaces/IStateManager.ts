import { MessageStatusEnum } from "../../bot_hooks/common/dtos/Conversation/MessageStatusEnum";

enum confimationResponse {
    confirm = "yes",
    decline = "no",
}

interface IStateManager {
    persistance: IPersistance;
    getCurrentStateStatusAsync(userId: string, appId: string | undefined): Promise<MessageStatusEnum | null>;
    getCurrentStateAsync(userId: string, appId: string | undefined): Promise<IConversationState | null>;
    setUserStateAsync(userId: string, appId: string, state: IConversationState): Promise<void>;
}