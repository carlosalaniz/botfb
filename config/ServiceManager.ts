import { MessensageRepository } from './../src/bot_hooks/facebook/repositories/MessageRepository';
import { RedisPersistance } from "../src/common/RedisPersistance";
import { StateManager as StMgr } from '../src/common/StateManager';
export namespace ServiceManager {
    const global: {
        [key: string]: any
    } = {}
    export var PersistanceService: IPersistance =
        (function (): IPersistance {
            if (global["3368bb50-43a3-493e-a012-76aeebee9f80"] == null) {
                (<any>global)["3368bb50-43a3-493e-a012-76aeebee9f80"] = new RedisPersistance();
            }
            return <IPersistance>(<any>global)["3368bb50-43a3-493e-a012-76aeebee9f80"];
        })();
    export var MessageRepository: IMessageRepository<IMessageEventDto> = new MessensageRepository();
    export var StateManager: IStateManager = (function (): IStateManager {
        if ((<any>global)["fe5b6785-40e6-4ed2-abb2-db1c93950b0a"] == null) {
            (<any>global)["fe5b6785-40e6-4ed2-abb2-db1c93950b0a"] = new StMgr();
        }
        return <IStateManager>(<any>global)["fe5b6785-40e6-4ed2-abb2-db1c93950b0a"];
    })();
}