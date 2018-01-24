import { MessensageRepository } from './../src/bot_hooks/facebook/repositories/MessageRepository';
import { RedisPersistance } from "../src/common/RedisPersistance";
import { StateManager as StMgr } from '../src/common/StateManager';
import { IStateManager } from '../src/common/interfaces/IStateManager';
export namespace ServiceManager {
    const global:
        {
            [key: string]: any
        } = {}

    export var PersistanceService: IPersistance =
        (function (): IPersistance {
            if (global["PersistanceService"] == null) {
                (<any>global)["PersistanceService"] = new RedisPersistance();
            }
            return <IPersistance>(<any>global)["PersistanceService"];
        })();
    export var StateManager: IStateManager =
        (function (): IStateManager {
            if ((<any>global)["StateManager"] == null) {
                (<any>global)["StateManager"] = new StMgr();
            }
            return <IStateManager>(<any>global)["StateManager"];
        })();
    export var MessageRepository: IMessageRepository<IMessageEventDto> = new MessensageRepository();
}