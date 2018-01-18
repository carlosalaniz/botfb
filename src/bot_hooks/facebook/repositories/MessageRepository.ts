'use strict'
var request = require('request');
var config = require('config');
import { BaseRepository } from './BaseRepository';

export class MessensageRepository
    extends BaseRepository
    implements IMessageRepository<IMessageDto> {
    baseUri: string;
    constructor() {
        var baseUri = config.get("BotHooks.Facebook.MessagerMessages");
        super(baseUri);
    }
    async sendAsync(message: IMessageDto) {
        var options = {
            uri: this.baseUri,
            qs: { access_token: this.pageAccessToken },
            method: 'POST',
            body: message,
            json: true
        };
        return request(options)
    }
}