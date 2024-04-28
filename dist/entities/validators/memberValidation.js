"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberByIdValidation = exports.updateMemberValidation = exports.registerMemberValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registerMemberValidation = joi_1.default.object({
    Name: joi_1.default.string().min(5).max(100).required(),
    Address: joi_1.default.string().min(10).max(100).required(),
    Email: joi_1.default.string().email().max(100).required(),
    Phone: joi_1.default.string().min(8).max(100).required(),
});
exports.registerMemberValidation = registerMemberValidation;
const updateMemberValidation = joi_1.default.object({
    Name: joi_1.default.string().min(5).max(100).optional(),
    Address: joi_1.default.string().min(10).max(100).optional(),
    Email: joi_1.default.string().email().max(100).optional(),
    Phone: joi_1.default.string().min(8).max(100).optional(),
});
exports.updateMemberValidation = updateMemberValidation;
const getMemberByIdValidation = joi_1.default.object({
    MemberID: joi_1.default.string().required(),
});
exports.getMemberByIdValidation = getMemberByIdValidation;
//# sourceMappingURL=memberValidation.js.map