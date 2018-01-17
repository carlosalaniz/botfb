'use strict'
var request = require('request');
import { BaseRepository } from './BaseRepository';

export class MessensageRepository
    extends BaseRepository
    implements IMessageRepository<IMessageDto> {
    async sendAsync(message: IMessageDto) {
        var options = {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: this.pageAccessToken },
            method: 'POST',
            body: message,
            json: true
        };
        console.log("requesting!");
        await request(options, function (err: any, httpResponse: any, body: any) {
            console.log("completed!")
            if (err) {
                return console.error('failed:', err);
            }
        })
        console.log("itwaited!")
    }
}