'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var MessageRepository_1 = require("../repositories/MessageRepository");
var MessageReadEventHandler = /** @class */ (function () {
    function MessageReadEventHandler() {
        this.repo = new MessageRepository_1.MessensageRepository();
    }
    MessageReadEventHandler.prototype.Handle = function (data) {
        console.log("Message Read.");
    };
    return MessageReadEventHandler;
}());
exports.MessageReadEventHandler = MessageReadEventHandler;
