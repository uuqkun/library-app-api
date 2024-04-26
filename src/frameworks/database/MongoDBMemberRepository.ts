import { Db, MongoClient } from "mongodb";
import { MemberRepository } from "../../interfaces/repositories/MemberRepository";
import Member from "../../entities/Member";
import { ResponseError } from "../../error/ResponseError";

export class MongoDBMemberRepository implements MemberRepository {
  private client: MongoClient;
  private db: Db;
  private readonly collectionName: string = "members";

  constructor(mongoURI: string) {
    this.client = new MongoClient(mongoURI);
    this.db = this.client.db();
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.close();
  }

  async getAllMembers(): Promise<Member[]> {
    const collection = this.db.collection(this.collectionName);
    const document = await collection.find().toArray();

    return document.map((member: any) => {
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

  async getMemberById(memberId: string): Promise<Member> {
    const collection = this.db.collection(this.collectionName);

    const member = await collection.findOne({
      MemberID: memberId,
    });

    console.log(member);

    if (!member) throw new ResponseError(404, "Member not found");

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

  async createMember(member: Member): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    const isMemberExist = await collection.findOne({
      Email: member.Email,
    });

    // CHECK IF MEMBER ALREADY REGISTERED
    if (isMemberExist)
      throw new ResponseError(409, "Cannot use this credential");

    const lastMember = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    const lastMemberID =
      lastMember.length > 0 ? lastMember[0].MemberID : "MEM000";
    const formattedID: number = parseInt(lastMemberID.slice(3)) + 1;
    const newMemberID = `MEM${formattedID.toString().padStart(3, "0")}`;

    // INSERT MEMBER TO DB
    await collection.insertOne({ MemberID: newMemberID, ...member });
  }

  async updateMember(memberID: string, data: any): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    const isMemberExist = await collection.findOne({
      MemberID: memberID,
    });

    // CHECK IF MEMBER EXIST
    if (!isMemberExist) throw new ResponseError(404, "Member not found");

    // VALIDATE DATA
    const validatedData = data;

    // SEND UPDATED DATA
    await collection.updateOne(
      { MemberID: memberID },
      {
        $set: {
          Name: validatedData.Name || isMemberExist.Name,
          Email: validatedData.Email || isMemberExist.Email,
          Phone: validatedData.Phone || isMemberExist.Phone,
          Address: validatedData.Address || isMemberExist.Address,
        },
      }
    );
  }

  async deleteMember(memberID: string): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    const member = await collection.findOne({
      MemberID: memberID,
    });

    if (!member) throw new ResponseError(404, "Member not found");

    await collection.deleteOne({ MemberID: memberID });
  }
}
