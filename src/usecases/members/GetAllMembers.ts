import Member from "../../entities/Member";
import { MemberRepository } from "../../repositories/MemberRepository";

export default class GetAllMembers {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(): Promise<Member[]> {
    return this.memberRepository.getAllMembers();
  }
}