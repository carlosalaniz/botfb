'use strict'
var request = require('request');
import { BaseRepository } from './BaseRepository';

export class MessensageRepository extends BaseRepository {
    async sendTextMessageAsync(sender: any, text: any) {
        var messageBody = {
            recipient: sender,
            message: { text: text },
        };
        var options = {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: this.pageAccessToken },
            method: 'POST',
            body: messageBody,
            json: true
        };
        await request(options, function (err: any, httpResponse: any, body: any) {
            if (err) {
                return console.error('upload failed:', err);
            }
        })
    }
}