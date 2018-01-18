'use strict'

import * as WebRequest from 'web-request';
import { MessensageRepository } from '../repositories/MessageRepository';

export class MessageReadEventHandler implements IEventHandler<IReadDto> {
    private repo: MessensageRepository;
    async HandleAsync(data: IReadDto) {
        console.log("Message Read.")
    }
    constructor() {
        this.repo = new MessensageRepository();
    }
}