"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateMember {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute(member) {
        return this.memberRepository.createMember(member);
    }
}
exports.default = CreateMember;
//# sourceMappingURL=CreateMember.js.map