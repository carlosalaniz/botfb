'use strict'

import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEvent> {
    private repo: MessensageRepository;
    HandleAsync(data: IMessageEvent): void {
        console.log("handling");
        console.log(data);
    }
    constructor() {
        this.repo = new MessensageRepository();
    }
}