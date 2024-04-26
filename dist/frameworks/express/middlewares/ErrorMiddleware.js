"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const ResponseError_1 = require("../../../error/ResponseError");
const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof ResponseError_1.ResponseError) {
        res
            .status(err.status)
            .json({
            errors: err.message,
        })
            .end();
    }
    else {
        res
            .status(500)
            .json({
            errors: err.message,
        })
            .end();
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map