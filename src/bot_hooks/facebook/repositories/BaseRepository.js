'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('config');
var BaseRepository = /** @class */ (function () {
    function BaseRepository() {
        this.pageAccessToken = config.get("PageAccessToken");
        this.baseUri = config.get("WebService.MessengerProfile");
    }
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
