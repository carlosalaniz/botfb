import { MessensageRepository } from './../src/bot_hooks/facebook/repositories/MessageRepository';
import { RedisPersistance } from "../src/common/RedisPersistance";

export class ServiceManager {
    static PersistanceService: IPersistance =
        (function (): IPersistance {
            if ((<any>global)["persistance"] == null) {
                (<any>global)["persistance"] = new RedisPersistance();
            }
            return <IPersistance>(<any>global)["persistance"];
        })();
    static MessageRepository: IMessageRepository<IMessageDto> = new MessensageRepository()
}