"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMember = exports.getMember = exports.deleteMember = void 0;
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017/library");
const db = client.db();
const members = "members";
const connect = async () => await client.connect();
const disconnect = async () => await client.close();
// TEST UTILS
const deleteMember = async (Email) => {
    await connect();
    const result = await db.collection(members).deleteOne({ Email: Email });
    await disconnect();
    return result;
};
exports.deleteMember = deleteMember;
const getMember = async (Email) => {
    await connect();
    const result = await db.collection(members).findOne({ Email: Email });
    await disconnect();
    return result;
};
exports.getMember = getMember;
const insertMember = async (member) => {
    await connect();
    const result = await db.collection(members).insertOne(member);
    await disconnect();
    return result;
};
exports.insertMember = insertMember;
//# sourceMappingURL=test-util.js.map