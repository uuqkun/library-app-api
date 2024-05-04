import Member from "../../entities/Member";
import { MemberRepository } from "../../repositories/MemberRepository";


export default class CreateMember { 
    constructor(private readonly memberRepository: MemberRepository) {}

    async execute(member: Member): Promise<void> {
        return this.memberRepository.createMember(member);
    }
}