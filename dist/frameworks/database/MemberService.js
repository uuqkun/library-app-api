"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const mongodb_1 = require("mongodb");
const ResponseError_1 = require("../../error/ResponseError");
const validation_1 = require("../../entities/validators/validation");
const memberValidation_1 = require("../../entities/validators/memberValidation");
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
    async getMemberById(reqID) {
        const { MemberID } = (0, validation_1.validate)(memberValidation_1.getMemberByIdValidation, {
            MemberID: reqID,
        });
        const collection = this.db.collection(this.collectionName);
        const member = await collection.findOne({
            MemberID: MemberID,
        });
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
        const { Email, ...data } = (0, validation_1.validate)(memberValidation_1.registerMemberValidation, {
            ...member,
        });
        const collection = this.db.collection(this.collectionName);
        const isMemberExist = await collection.findOne({
            Email: Email,
        });
        // CHECK IF MEMBER ALREADY REGISTERED
        if (isMemberExist)
            throw new ResponseError_1.ResponseError(409, "Cannot use this credential");
        data.Email = Email;
        const lastMember = await collection
            .find()
            .sort({ _id: -1 })
            .limit(1)
            .toArray();
        // COMPOSE NEW MEMBER ID
        const lastMemberID = lastMember.length > 0 ? lastMember[0].MemberID : "MEM000";
        const formattedID = parseInt(lastMemberID.slice(3)) + 1;
        const newMemberID = `MEM${formattedID.toString().padStart(3, "0")}`;
        // COMPOSE REGISTRATION DATE
        const RegistrationDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
        data.RegistrationDate = RegistrationDate;
        // INSERT MEMBER TO DB
        await collection.insertOne({ MemberID: newMemberID, ...data });
    }
    async updateMember(reqID, data) {
        const { MemberID, ...validatedData } = (0, validation_1.validate)(memberValidation_1.updateMemberValidation, {
            MemberID: reqID,
            ...data,
        });
        const collection = this.db.collection(this.collectionName);
        const member = await collection.findOne({
            MemberID: MemberID,
        });
        // CHECK IF MEMBER EXIST
        if (!member)
            throw new ResponseError_1.ResponseError(404, "Member not found");
        // SEND UPDATED DATA
        await collection.updateOne({ MemberID: MemberID }, {
            $set: {
                Name: validatedData.Name || member.Name,
                Email: validatedData.Email || member.Email,
                Phone: validatedData.Phone || member.Phone,
                Address: validatedData.Address || member.Address,
            },
        });
    }
    async deleteMember(reqID) {
        const { MemberID } = (0, validation_1.validate)(memberValidation_1.getMemberByIdValidation, {
            MemberID: reqID,
        });
        const collection = this.db.collection(this.collectionName);
        const member = await collection.findOne({
            MemberID: MemberID,
        });
        if (!member)
            throw new ResponseError_1.ResponseError(404, "Member not found");
        await collection.deleteOne({ MemberID: MemberID });
    }
}
exports.MemberService = MemberService;
//# sourceMappingURL=MemberService.js.map