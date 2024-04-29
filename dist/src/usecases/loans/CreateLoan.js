"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateLoan {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }
    async execute(loan) {
        return this.loanRepository.createLoan(loan);
    }
}
exports.default = CreateLoan;
//# sourceMappingURL=CreateLoan.js.map