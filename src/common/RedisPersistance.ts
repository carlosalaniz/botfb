var Redis = require("ioredis");
var config = require('config');

export class RedisPersistance implements IPersistance {
    private client: any;
    constructor() {
        var connection = config.get("Persistance.redis")
        this.client = new Redis(connection);
    }
    async getAsync(key: string): Promise<string> {
        return this.client.get(key);
    }
    async setAsync(key: string, value: any) {
        return this.client.set(key, JSON.stringify(value));
    }
}