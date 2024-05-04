import { Db, MongoClient } from "mongodb";
import { MemberRepository } from "../repositories/MemberRepository";
import Member from "../entities/Member";
import { ResponseError } from "../error/ResponseError";
import { validate } from "../entities/validators/validation";
import {
  getMemberByIdValidation,
  registerMemberValidation,
  updateMemberValidation,
} from "../entities/validators/memberValidation";

export class MemberService implements MemberRepository {
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

  async getMemberById(reqID: string): Promise<Member> {
    const { MemberID } = validate(getMemberByIdValidation, {
      MemberID: reqID,
    });
    const collection = this.db.collection(this.collectionName);

    const member = await collection.findOne({
      MemberID: MemberID,
    });

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
    const { Email, ...data } = validate(registerMemberValidation, {
      ...member,
    });
    const collection = this.db.collection(this.collectionName);

    const isMemberExist = await collection.findOne({
      Email: Email,
    });

    // CHECK IF MEMBER ALREADY REGISTERED
    if (isMemberExist)
      throw new ResponseError(409, "Cannot use this credential");

    data.Email = Email;

    const lastMember = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    // COMPOSE NEW MEMBER ID
    const lastMemberID =
      lastMember.length > 0 ? lastMember[0].MemberID : "MEM000";
    const formattedID: number = parseInt(lastMemberID.slice(3)) + 1;
    const newMemberID = `MEM${formattedID.toString().padStart(3, "0")}`;

    // COMPOSE REGISTRATION DATE
    const RegistrationDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    data.RegistrationDate = RegistrationDate;

    // INSERT MEMBER TO DB
    await collection.insertOne({ MemberID: newMemberID, ...data });
  }

  async updateMember(reqID: string, data: any): Promise<void> {
    const { MemberID, Email, ...validatedData } = validate(
      updateMemberValidation,
      {
        MemberID: reqID,
        ...data,
      }
    );

    const collection = this.db.collection(this.collectionName);

    const member = await collection.findOne({
      MemberID: MemberID,
    });

    // CHECK IF MEMBER EXIST
    if (!member) throw new ResponseError(404, "Member not found");

    if (Email) {
      const isEmailExist = await collection.findOne({ Email: Email });

      if (isEmailExist)
        throw new ResponseError(409, "Cannot use this credential");
    }

    // SEND UPDATED DATA
    await collection.updateOne(
      { MemberID: MemberID },
      {
        $set: {
          Name: validatedData.Name || member.Name,
          Email: validatedData.Email || member.Email,
          Phone: validatedData.Phone || member.Phone,
          Address: validatedData.Address || member.Address,
        },
      }
    );
  }

  async deleteMember(reqID: string): Promise<void> {
    const { MemberID } = validate(getMemberByIdValidation, {
      MemberID: reqID,
    });
    const collection = this.db.collection(this.collectionName);

    const member = await collection.findOne({
      MemberID: MemberID,
    });

    if (!member) throw new ResponseError(404, "Member not found");

    await collection.deleteOne({ MemberID: MemberID });
  }
}
