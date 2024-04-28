"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetLoanByID {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }
    async execute(loanID) {
        return this.loanRepository.getLoanByID(loanID);
    }
}
exports.default = GetLoanByID;
//# sourceMappingURL=GetLoanById.js.map