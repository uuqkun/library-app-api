"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllMembers {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute() {
        return this.memberRepository.getAllMembers();
    }
}
exports.default = GetAllMembers;
//# sourceMappingURL=GetAllMembers.js.map