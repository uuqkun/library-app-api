"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMembers = void 0;
class GetAllMembers {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async execute() {
        return this.memberRepository.getAllMembers();
    }
}
exports.GetAllMembers = GetAllMembers;
//# sourceMappingURL=GetAllMembers.js.map