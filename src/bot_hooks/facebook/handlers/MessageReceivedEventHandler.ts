import { FacebookMessageProcessor } from './FacebookMessageProcessor';
import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';
import { ServiceManager } from '../../../../config/ServiceManager';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEventDto> {
    processor: FacebookMessageProcessor;
    private repo: MessensageRepository;
    private persistance: IPersistance = ServiceManager.PersistanceService;

    async HandleAsync(data: IMessageEventDto) {
        try {
            var state = await ServiceManager.StateManager.getCurrentStateAsync(data.sender.id, data.recipient.id);
            console.log(state);
            var rSet = await ServiceManager.StateManager.setUserStateAsync(data.sender.id, data.recipient.id,
                {
                    application_id: data.recipient.id,
                    messageStatus: MessageStatusEnum.message_recieved
                }
            )
            console.log(rSet);
            state = await ServiceManager.StateManager.getCurrentStateAsync(data.sender.id, data.recipient.id);
            console.log(state);
            await this.processor.proccessAsync(data);
        } catch (e) {
            console.error(e);
        }
    }
    constructor() {
        this.processor = new FacebookMessageProcessor
        this.repo = new MessensageRepository();
    }
}

