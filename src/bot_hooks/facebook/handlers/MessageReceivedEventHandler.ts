'use strict'

import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';

export class MessageReceivedEventHandler implements IEventHandler<IMessageEvent> {
    private repo: MessensageRepository;
    Handle(data: IMessageEvent) {
        this.repo.sendTextMessageAsync(data.sender, data.message.text).then((res: any) => {
            console.log(res);
            console.log("Message recieved handled");
        }).catch((err: any) => {
            console.error("error! ", err)
        });
    }
    constructor() {
        this.repo = new MessensageRepository();
    }
}