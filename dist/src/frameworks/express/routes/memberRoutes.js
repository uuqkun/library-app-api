"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MemberService_1 = require("../../database/MemberService");
const members_1 = require("../../../usecases/members");
const memberRoutes = express_1.default.Router();
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/library";
const memberRepository = new MemberService_1.MemberService(mongoURI);
// routes
memberRoutes.get("/members", async (req, res, next) => {
    try {
        await memberRepository.connect();
        const getAllMembers = new members_1.GetAllMembers(memberRepository);
        const members = await getAllMembers.execute();
        await memberRepository.disconnect();
        res.json({ data: members });
    }
    catch (error) {
        next(error);
    }
});
memberRoutes.get("/members/:memberId", async (req, res, next) => {
    try {
        await memberRepository.connect();
        const memberId = req.params.memberId;
        const getMemberById = new members_1.GetMemberById(memberRepository);
        const members = await getMemberById.execute(memberId);
        await memberRepository.disconnect();
        res.json({ data: members });
    }
    catch (error) {
        next(error);
    }
});
memberRoutes.post("/members", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const createMember = new members_1.CreateMember(memberRepository);
        // EXECUTE QUERIES
        await createMember.execute(body);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member registered successfully!" });
    }
    catch (error) {
        next(error);
    }
});
memberRoutes.patch("/members/:memberID", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        const memberID = req.params.memberID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const updateMember = new members_1.UpdateMember(memberRepository);
        // EXECUTE QUERIES
        await updateMember.execute(memberID, body);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member updated successfully!" });
    }
    catch (error) {
        next(error);
    }
});
memberRoutes.delete("/members/:memberID", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER ID
        const memberID = req.params.memberID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const deleteMember = new members_1.DeleteMember(memberRepository);
        // EXECUTE QUERIES
        await deleteMember.execute(memberID);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = memberRoutes;
//# sourceMappingURL=memberRoutes.js.map