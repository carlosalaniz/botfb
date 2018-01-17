'use strict'
var config = require('config');
export abstract class BaseRepository {
    abstract readonly baseUri: string;
    protected readonly pageAccessToken: string;
    constructor(baseUri:string) {
        this.pageAccessToken = config.get("PageAccessToken");
        this.baseUri = baseUri;
    }
}