import Member from "../../entities/Member";
import { MemberRepository } from "../../repositories/MemberRepository";

export default class GetMemberById {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(memberId: string): Promise<Member> {
    return this.memberRepository.getMemberById(memberId);
  }
}
