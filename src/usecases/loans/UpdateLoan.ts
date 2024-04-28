import { LoanRepository } from "../../interfaces/repositories/LoanRepository";

export default class UpdateLoan { 
    constructor(private readonly loanRepository: LoanRepository) {}

    async execute(loanID: string): Promise<void> { 
        return this.loanRepository.updateLoan(loanID);
    }
}