import { MessensageRepository } from './../src/bot_hooks/facebook/repositories/MessageRepository';
import { RedisPersistance } from "../src/common/RedisPersistance";
import { StateManager as StMgr } from '../src/common/StateManager';
import { IStateManager } from '../src/common/interfaces/IStateManager';
export namespace ContextManager {
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
    export var userId: string  =
        (function (): string {
            if ((<any>global)["UserId"] == null) {
                (<any>global)["UserId"] = null;
            }
            return <string >(<any>global)["UserId"];
        })();

    export var setUserId =
        function (userid: string): string {
            (<any>global)["UserId"] = userid;
            return (<any>global)["UserId"];
        };

    export var appId: string  =
        (function (): string  {
            if ((<any>global)["AppId"] == null) {
                (<any>global)["AppId"] = null;
            }
            return <string >(<any>global)["AppId"];
        })();

    export var setAppId =
        function (appId: string): string {
            (<any>global)["AppId"] = appId;
            return (<any>global)["AppId"];
        };

    export var MessageRepository: IMessageRepository<IMessageEventDto> = new MessensageRepository();
}