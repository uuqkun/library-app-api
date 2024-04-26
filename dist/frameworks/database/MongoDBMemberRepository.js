"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBMemberRepository = void 0;
const mongodb_1 = require("mongodb");
const ResponseError_1 = require("../../error/ResponseError");
class MongoDBMemberRepository {
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
            $where() {
                return this.MemberID === memberId;
            },
        });
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
            Email: member.Email
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
        console.log({ MemberID: newMemberID, ...member });
        // INSERT MEMBER TO DB
        await collection.insertOne({ MemberID: newMemberID, ...member });
    }
}
exports.MongoDBMemberRepository = MongoDBMemberRepository;
//# sourceMappingURL=MongoDBMemberRepository.js.map