"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllLoans {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }
    async execute() {
        return this.loanRepository.getAllLoans();
    }
}
exports.default = GetAllLoans;
//# sourceMappingURL=GetAllLoans.js.map