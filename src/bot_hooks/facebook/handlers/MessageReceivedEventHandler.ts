import { FacebookMessageProcessor } from './FacebookMessageProcessor';
import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';
import { ServiceManager } from '../../../../config/ServiceManager';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEventDto> {
    processor: FacebookMessageProcessor;
    private repo: MessensageRepository;
    private persistance: IPersistance = ServiceManager.PersistanceService;

    async HandleAsync(data: IMessageEventDto) {
        // console.log(data);
        try{
            await this.processor.proccessAsync(data);
        }catch(e){
            console.error(e);
        }
        // var a = this.persistance.getAsync("key")
        // var message: IMessageDto = {
        //     sender: data.recipient,
        //     recipient: data.sender,
        //     message: {
        //         text: "ECHO: " + data.message.text
        //     }
        // };
        // try {
        //     var httpResponse = await this.repo.sendAsync(message);
        //     console.log("Message recieved handled");
        // }
        // catch (err) {
        //     console.error("error! ", err)
        // };
    }
    constructor() {
        this.processor = new FacebookMessageProcessor
        this.repo = new MessensageRepository();
    }
}

