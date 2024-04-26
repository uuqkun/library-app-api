"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMemberById = void 0;
class GetMemberById {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute(memberId) {
        return this.memberRepository.getMemberById(memberId);
    }
}
exports.GetMemberById = GetMemberById;
//# sourceMappingURL=GetMemberById.js.map