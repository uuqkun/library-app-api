"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateMember {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute(memberID, data) {
        return this.memberRepository.updateMember(memberID, data);
    }
}
exports.default = UpdateMember;
//# sourceMappingURL=UpdateMember.js.map