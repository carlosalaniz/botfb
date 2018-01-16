"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller(app, routePrefix) {
        if (routePrefix === void 0) { routePrefix = ""; }
        this.app = app;
        this.routePrefix = routePrefix;
    }
    return Controller;
}());
exports.Controller = Controller;
