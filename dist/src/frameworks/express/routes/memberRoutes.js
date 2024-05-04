"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MemberController_1 = __importDefault(require("../controllers/MemberController"));
const memberRoutes = express_1.default.Router();
// routes
memberRoutes.get("/members", MemberController_1.default.getMembers);
memberRoutes.get("/members/:memberId", MemberController_1.default.getMemberById);
memberRoutes.post("/members", MemberController_1.default.createMember);
memberRoutes.patch("/members/:memberID", MemberController_1.default.updateMember);
memberRoutes.delete("/members/:memberID", MemberController_1.default.deleteMember);
exports.default = memberRoutes;
//# sourceMappingURL=memberRoutes.js.map