"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateLoan {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }
    async execute(loanID) {
        return this.loanRepository.updateLoan(loanID);
    }
}
exports.default = UpdateLoan;
//# sourceMappingURL=UpdateLoan.js.map