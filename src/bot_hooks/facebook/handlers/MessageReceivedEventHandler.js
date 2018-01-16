'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var MessageRepository_1 = require("../repositories/MessageRepository");
var MessageReceivedEventHandler = /** @class */ (function () {
    function MessageReceivedEventHandler() {
        this.repo = new MessageRepository_1.MessensageRepository();
    }
    MessageReceivedEventHandler.prototype.Handle = function (data) {
        var message = {
            sender: data.recipient,
            recipient: data.sender,
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url: "http://www.grani.lv/uploads/posts/2011-08/1313654214_kotiki_432.jpg"
                    }
                }
            }
        };
        this.repo.sendAsync(message).then(function (res) {
            console.log(res);
            console.log("Message recieved handled");
        }).catch(function (err) {
            console.error("error! ", err);
        });
    };
    return MessageReceivedEventHandler;
}());
exports.MessageReceivedEventHandler = MessageReceivedEventHandler;
