"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageProcessor = /** @class */ (function () {
    function MessageProcessor(conversationDefinition, tokenActionMap, messageRepo) {
        this.conversationDefinition = conversationDefinition;
        this.tokenActionMap = tokenActionMap;
        this.messageRepo = messageRepo;
    }
    MessageProcessor.prototype.CMFS = function (stringMessage) {
        return this.createMessageFromString(stringMessage);
    };
    ;
    /**
     * Finds the first action token available and resturns it
     * @param text
     */
    MessageProcessor.prototype.searchForTokens = function (text) {
        var _this = this;
        text.split(" ").forEach(function (token) {
            if (_this.tokenActionMap[token] != null) {
                return token;
            }
        });
        return null;
    };
    /**
     * parses a message and returns it's action
     * @param message
     */
    MessageProcessor.prototype.getAction = function (message) {
        var token = this.searchForTokens(message);
        if (token != null) {
            var actionIdentifier = this.tokenActionMap[token];
            return this.conversationDefinition.actions[actionIdentifier];
        }
        else {
            //todo: localization
            this.messageRepo.sendAsync(this.CMFS(JSON.stringify("I couldn't understand that message")))
                .catch(function (err) { return console.log(err); });
        }
        return null;
    };
    return MessageProcessor;
}());
exports.MessageProcessor = MessageProcessor;
