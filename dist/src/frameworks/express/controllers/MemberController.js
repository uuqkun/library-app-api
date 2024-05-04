"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MemberService_1 = require("../../mongo/MemberService");
const members_1 = require("../../../usecases/members");
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/library";
const memberRepository = new MemberService_1.MemberService(mongoURI);
const getMembers = async (req, res, next) => {
    try {
        await memberRepository.connect();
        const usecase = new members_1.GetAllMembers(memberRepository);
        const members = await usecase.execute();
        await memberRepository.disconnect();
        res.json({ data: members });
    }
    catch (error) {
        next(error);
    }
};
const getMemberById = async (req, res, next) => {
    try {
        await memberRepository.connect();
        const memberId = req.params.memberId;
        const usecase = new members_1.GetMemberById(memberRepository);
        const members = await usecase.execute(memberId);
        await memberRepository.disconnect();
        res.json({ data: members });
    }
    catch (error) {
        next(error);
    }
};
const createMember = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const usecase = new members_1.CreateMember(memberRepository);
        // EXECUTE QUERIES
        await usecase.execute(body);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member registered successfully!" });
    }
    catch (error) {
        next(error);
    }
};
const updateMember = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        const memberID = req.params.memberID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const usecase = new members_1.UpdateMember(memberRepository);
        // EXECUTE QUERIES
        await usecase.execute(memberID, body);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member updated successfully!" });
    }
    catch (error) {
        next(error);
    }
};
const deleteMember = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER ID
        const memberID = req.params.memberID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const usecase = new members_1.DeleteMember(memberRepository);
        // EXECUTE QUERIES
        await usecase.execute(memberID);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { getMembers, getMemberById, createMember, updateMember, deleteMember };
//# sourceMappingURL=MemberController.js.map