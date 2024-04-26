"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MongoDBMemberRepository_1 = require("../../database/MongoDBMemberRepository");
const GetAllMembers_1 = require("../../../usecases/members/GetAllMembers");
const GetMemberById_1 = require("../../../usecases/members/GetMemberById");
const CreateMember_1 = require("../../../usecases/members/CreateMember");
const memberRoutes = express_1.default.Router();
const mongoURI = "mongodb://localhost:27017/library";
const memberRepository = new MongoDBMemberRepository_1.MongoDBMemberRepository(mongoURI);
// routes
memberRoutes.get("/members", async (req, res) => {
    try {
        await memberRepository.connect();
        const getAllMembers = new GetAllMembers_1.GetAllMembers(memberRepository);
        const members = await getAllMembers.execute();
        await memberRepository.disconnect();
        res.json({ data: members });
    }
    catch (error) {
        console.error("Error occurred: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
memberRoutes.get("/members/:memberId", async (req, res) => {
    try {
        await memberRepository.connect();
        const memberId = req.params.memberId;
        const getMemberById = new GetMemberById_1.GetMemberById(memberRepository);
        const members = await getMemberById.execute(memberId);
        await memberRepository.disconnect();
        res.json({ data: members });
    }
    catch (error) {
        console.error("Error occurred: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
memberRoutes.post("/members", async (req, res) => {
    try {
        // ESTABLISH CONNECTION
        await memberRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const createMember = new CreateMember_1.CreateMember(memberRepository);
        // EXECUTE QUERIES
        await createMember.execute(body);
        // CLOSE CONNECTION
        await memberRepository.disconnect();
        res.status(201).json({ message: "Member registered successfully!" });
    }
    catch (error) {
        console.log("Error Occured: ", error);
        res.status(500).json({ error: "Internal Server Error " });
    }
});
exports.default = memberRoutes;
//# sourceMappingURL=memberRoutes.js.map