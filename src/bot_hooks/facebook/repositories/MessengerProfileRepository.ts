'use strict'
import * as WebRequest from 'web-request';
import { BaseRepository } from './BaseRepository';

export class MessengerProfileRepository extends BaseRepository {
  baseUri: string;
  async getAsync() {
    var result = await WebRequest.json<IMessengerProfile>(this.baseUri,
      { qs: { access_token: this.pageAccessToken } });
    return result;
  }
}