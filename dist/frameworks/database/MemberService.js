"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const mongodb_1 = require("mongodb");
const ResponseError_1 = require("../../error/ResponseError");
class MemberService {
    constructor(mongoURI) {
        this.collectionName = "members";
        this.client = new mongodb_1.MongoClient(mongoURI);
        this.db = this.client.db();
    }
    async connect() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.close();
    }
    async getAllMembers() {
        const collection = this.db.collection(this.collectionName);
        const document = await collection.find().toArray();
        return document.map((member) => {
            return {
                _id: member._id,
                MemberID: member.MemberID,
                Name: member.Name,
                Address: member.Address,
                Email: member.Email,
                Phone: member.Phone,
                RegistrationDate: member.RegistrationDate,
            };
        });
    }
    async getMemberById(memberId) {
        const collection = this.db.collection(this.collectionName);
        const member = await collection.findOne({
            MemberID: memberId,
        });
        console.log(member);
        if (!member)
            throw new ResponseError_1.ResponseError(404, "Member not found");
        return {
            _id: member._id,
            MemberID: member.MemberID,
            Name: member.Name,
            Address: member.Address,
            Email: member.Email,
            Phone: member.Phone,
            RegistrationDate: member.RegistrationDate,
        };
    }
    async createMember(member) {
        const collection = this.db.collection(this.collectionName);
        const isMemberExist = await collection.findOne({
            Email: member.Email,
        });
        // CHECK IF MEMBER ALREADY REGISTERED
        if (isMemberExist)
            throw new ResponseError_1.ResponseError(409, "Cannot use this credential");
        const lastMember = await collection
            .find()
            .sort({ _id: -1 })
            .limit(1)
            .toArray();
        const lastMemberID = lastMember.length > 0 ? lastMember[0].MemberID : "MEM000";
        const formattedID = parseInt(lastMemberID.slice(3)) + 1;
        const newMemberID = `MEM${formattedID.toString().padStart(3, "0")}`;
        // INSERT MEMBER TO DB
        await collection.insertOne({ MemberID: newMemberID, ...member });
    }
    async updateMember(memberID, data) {
        const collection = this.db.collection(this.collectionName);
        const isMemberExist = await collection.findOne({
            MemberID: memberID,
        });
        // CHECK IF MEMBER EXIST
        if (!isMemberExist)
            throw new ResponseError_1.ResponseError(404, "Member not found");
        // VALIDATE DATA
        const validatedData = data;
        // SEND UPDATED DATA
        await collection.updateOne({ MemberID: memberID }, {
            $set: {
                Name: validatedData.Name || isMemberExist.Name,
                Email: validatedData.Email || isMemberExist.Email,
                Phone: validatedData.Phone || isMemberExist.Phone,
                Address: validatedData.Address || isMemberExist.Address,
            },
        });
    }
    async deleteMember(memberID) {
        const collection = this.db.collection(this.collectionName);
        const member = await collection.findOne({
            MemberID: memberID,
        });
        if (!member)
            throw new ResponseError_1.ResponseError(404, "Member not found");
        await collection.deleteOne({ MemberID: memberID });
    }
}
exports.MemberService = MemberService;
//# sourceMappingURL=MemberService.js.map