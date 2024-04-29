"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookValidation = exports.getBookByISBNValidation = exports.insertBookValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const insertBookValidation = joi_1.default.object({
    ISBN: joi_1.default.string().required(),
    Title: joi_1.default.string().required(),
    Author: joi_1.default.string().required(),
    Category: joi_1.default.string().required(),
    PublishYear: joi_1.default.number().required(),
    Publisher: joi_1.default.string().required(),
    AvailableCopies: joi_1.default.number().required(),
});
exports.insertBookValidation = insertBookValidation;
const getBookByISBNValidation = joi_1.default.object({
    ISBN: joi_1.default.string().required(),
});
exports.getBookByISBNValidation = getBookByISBNValidation;
const updateBookValidation = joi_1.default.object({
    ISBN: joi_1.default.string().optional(),
    Title: joi_1.default.string().optional(),
    Author: joi_1.default.string().optional(),
    Category: joi_1.default.string().optional(),
    PublishYear: joi_1.default.number().optional(),
    Publisher: joi_1.default.string().optional(),
    AvailableCopies: joi_1.default.number().optional(),
});
exports.updateBookValidation = updateBookValidation;
//# sourceMappingURL=bookValidation.js.map