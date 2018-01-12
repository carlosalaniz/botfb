'use strict'

import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEvent> {
    private repo: MessensageRepository;
    async HandleAsync(data: IMessageEvent) {
        await this.repo.sendTextMessageAsync(data.sender, data.message.text);
    }
    constructor() {
        this.repo = new MessensageRepository();
    }
}