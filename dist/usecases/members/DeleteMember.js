"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteMember {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute(memberID) {
        return this.memberRepository.deleteMember(memberID);
    }
}
exports.default = DeleteMember;
//# sourceMappingURL=DeleteMember.js.map