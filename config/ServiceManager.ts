import { MessensageRepository } from './../src/bot_hooks/facebook/repositories/MessageRepository';
import { RedisPersistance } from "../src/common/RedisPersistance";
import { StateManager } from '../src/common/StateManager';

export class ServiceManager {
    static PersistanceService: IPersistance =
        (function (): IPersistance {
            if ((<any>global)["3368bb50-43a3-493e-a012-76aeebee9f80"] == null) {
                (<any>global)["3368bb50-43a3-493e-a012-76aeebee9f80"] = new RedisPersistance();
            }
            return <IPersistance>(<any>global)["3368bb50-43a3-493e-a012-76aeebee9f80"];
        })();
    static MessageRepository: IMessageRepository<IMessageEventDto> = new MessensageRepository();
    static StateManager: IStateManager = (function (): IStateManager {
        if ((<any>global)["fe5b6785-40e6-4ed2-abb2-db1c93950b0a"] == null) {
            (<any>global)["fe5b6785-40e6-4ed2-abb2-db1c93950b0a"] = new StateManager();
        }
        return <IStateManager>(<any>global)["fe5b6785-40e6-4ed2-abb2-db1c93950b0a"];
    })();
}