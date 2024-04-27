"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ResponseError_1 = require("../../error/ResponseError");
const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (result.error) {
        throw new ResponseError_1.ResponseError(400, result.error.message);
    }
    else {
        return result.value;
    }
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map