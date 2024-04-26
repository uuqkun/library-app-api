"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMember = void 0;
class CreateMember {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute(member) {
        return this.memberRepository.createMember(member);
    }
}
exports.CreateMember = CreateMember;
//# sourceMappingURL=CreateMember.js.map