"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetMemberById {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute(memberId) {
        return this.memberRepository.getMemberById(memberId);
    }
}
exports.default = GetMemberById;
//# sourceMappingURL=GetMemberById.js.map