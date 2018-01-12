'use strict'
import * as WebRequest from 'web-request';
import { BaseRepository } from './BaseRepository';

export class MessensageRepository extends BaseRepository {
    sendTextMessageAsync(sender: any, text: any) {
        let messageData = { text: text }
        WebRequest.post(
            'https://graph.facebook.com/v2.6/me/messages',
            {
                qs: { access_token: this.pageAccessToken },
                method: 'POST',
            },
            {
                recipient: { id: sender },
                message: { text: "SOME MEESAGE dfdf" },
            });
    }
}