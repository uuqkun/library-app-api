"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetLoan {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }
    async execute(req) {
        return this.loanRepository.getLoan(req);
    }
}
exports.default = GetLoan;
//# sourceMappingURL=GetLoan.js.map