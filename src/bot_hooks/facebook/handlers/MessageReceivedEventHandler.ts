import { FacebookMessageProcessor } from './FacebookMessageProcessor';
import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';
import { ServiceManager } from '../../../../config/ServiceManager';
import { MessageStatusEnum } from '../../common/dtos/Conversation/MessageStatusEnum';
import { WebhookEventsEnum } from '../common/enums/WebhookEventsEnum';
import { IStateManager } from '../../../common/interfaces/IStateManager';
var config = require('config');

abstract class BaseFacebookMessageEventHandler {
    protected abstract eventType: WebhookEventsEnum;
    protected stateManager: IStateManager = ServiceManager.StateManager;
    protected async updateStateStatusAsync(data: IMessageEventDto) {
        var currentStatus = await this.stateManager.getCurrentStateAsync(data.sender.id, config["FacebookPageId"]);
    }
}



export class MessageReceivedEventHandler
    extends BaseFacebookMessageEventHandler
    implements IEventHandler<IMessageEventDto> {
    protected eventType: WebhookEventsEnum = WebhookEventsEnum.messages;
    processor: FacebookMessageProcessor;
    async HandleAsync(data: IMessageEventDto) {
        try {
            this.updateStateStatusAsync(data);
            await this.processor.proccessAsync(data);
        } catch (e) {
            console.error(e);
        }
    }
    constructor() {
        super();
        this.processor = new FacebookMessageProcessor
    }
}

