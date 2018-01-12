'use strict'
var config = require('config');
export abstract class BaseRepository {
    protected readonly baseUri: string;
    protected readonly pageAccessToken: string;
    constructor() {
        this.pageAccessToken = config.get("PageAccessToken");
        this.baseUri = config.get("WebService.MessengerProfile");
    }
}