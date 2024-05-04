import Member from "../../entities/Member";
import { MemberRepository } from "../../repositories/MemberRepository";

export default class UpdateMember {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(memberID: string, data: any): Promise<void> {
    return this.memberRepository.updateMember(memberID, data);
  }
}
