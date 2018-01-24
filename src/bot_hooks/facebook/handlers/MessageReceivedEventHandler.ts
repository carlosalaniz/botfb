import { FacebookMessageProcessor } from './FacebookMessageProcessor';
import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';
import { ServiceManager } from '../../../../config/ServiceManager';
import { MessageStatusEnum } from '../../common/dtos/Conversation/MessageStatusEnum';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEventDto> {
    processor: FacebookMessageProcessor;
    private repo: MessensageRepository;
    private persistance: IPersistance = ServiceManager.PersistanceService;

    async HandleAsync(data: IMessageEventDto) {
        try {
            var state = await ServiceManager.StateManager.getCurrentStateAsync(data.sender.id, data.recipient.id);
            
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

