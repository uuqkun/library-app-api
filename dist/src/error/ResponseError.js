"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ResponseError = ResponseError;
//# sourceMappingURL=ResponseError.js.map