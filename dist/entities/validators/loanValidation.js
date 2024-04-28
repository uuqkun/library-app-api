"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanValidation = exports.getLoanByIdValidation = exports.createLoanValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createLoanValidation = joi_1.default.object({
    MemberID: joi_1.default.string().required(),
    ISBN: joi_1.default.string().required(),
});
exports.createLoanValidation = createLoanValidation;
const getLoanByIdValidation = joi_1.default.object({
    LoanID: joi_1.default.string().required(),
});
exports.getLoanByIdValidation = getLoanByIdValidation;
const getLoanValidation = joi_1.default.object({
    MemberID: joi_1.default.string().optional(),
    name: joi_1.default.string().optional(),
});
exports.getLoanValidation = getLoanValidation;
//# sourceMappingURL=loanValidation.js.map