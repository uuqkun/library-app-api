import Member from "../../entities/Member";

interface IMemberUpdate {
  Email: string;
  Name: string;
  Address: string;
  Phone: string;
}

export interface MemberRepository {
  getAllMembers(): Promise<Member[]>;
  getMemberById(memberID: string): Promise<Member>;
  createMember(member: Member): Promise<void>;
  updateMember(memberID: string, data: IMemberUpdate): Promise<void>;
  deleteMember(memberID: string): Promise<void>;
}
