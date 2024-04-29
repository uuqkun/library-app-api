"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteLoan {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }
    async execute(loanID) {
        return this.loanRepository.deleteLoan(loanID);
    }
}
exports.default = DeleteLoan;
//# sourceMappingURL=DeleteLoan.js.map