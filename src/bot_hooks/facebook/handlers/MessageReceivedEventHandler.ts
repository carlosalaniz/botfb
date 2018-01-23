import { FacebookMessageProcessor } from './FacebookMessageProcessor';
import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';
import { ServiceManager } from '../../../../config/ServiceManager';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEventDto> {
    processor: FacebookMessageProcessor;
    private repo: MessensageRepository;
    private persistance: IPersistance = ServiceManager.PersistanceService;

    async HandleAsync(data: IMessageEventDto) {
        try{
            await this.processor.proccessAsync(data);
        }catch(e){
            console.error(e);
        }
    }
    constructor() {
        this.processor = new FacebookMessageProcessor
        this.repo = new MessensageRepository();
    }
}

