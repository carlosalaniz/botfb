'use strict'

import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';

export class MessageReceivedEventHandler implements IEventHandler<IMessageDto> {
    private repo: MessensageRepository;
    Handle(data: IMessageDto) {
        var message: IMessageDto = {
            sender: data.recipient,
            recipient: data.sender,
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url: "http://www.grani.lv/uploads/posts/2011-08/1313654214_kotiki_432.jpg"
                    }
                }
            }
        };
        this.repo.sendAsync(message).then((res: any) => {
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

