"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || 'Whops, something went wrong!';
    res.status(404).json({ status: status, message: message });
};
exports.default = errorMiddleware;
