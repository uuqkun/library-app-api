import { LoanRepository } from "../../repositories/LoanRepository";

export default class DeleteLoan { 
    constructor(private readonly loanRepository: LoanRepository) {}

    async execute(loanID: string): Promise<void> { 
        return this.loanRepository.deleteLoan(loanID);
    }
}