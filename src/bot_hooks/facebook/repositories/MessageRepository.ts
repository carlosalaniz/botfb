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
    async sendAsync(message: IMessageDto | IMessageDto[]) {
        if (!Array.isArray(message)) message = [message];
        if (message.length == 0) return;
        var options = {
            uri: this.baseUri,
            qs: { access_token: this.pageAccessToken },
            method: 'POST',
            body: message[0],
            json: true
        };
        return request(options,
            (error: any, response: any, body: any) => (function (error: any, response: any, body: any, message: IMessageDto[], callback: any) {
                console.log(message.shift(), " Processed.")
                return callback(message);
            })(error, response, body, <IMessageDto[]>message, this.sendAsync)
        );
    }
}