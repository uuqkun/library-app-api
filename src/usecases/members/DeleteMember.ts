import { MemberRepository } from "../../interfaces/repositories/MemberRepository";

export default class DeleteMember { 
    constructor(private readonly memberRepository:MemberRepository) {}

    async execute(memberID: string): Promise<void> { 
        return this.memberRepository.deleteMember(memberID);
    }
}