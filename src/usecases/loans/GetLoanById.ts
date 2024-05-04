import { LoanRepository } from "../../repositories/LoanRepository";

export default class GetLoanByID { 
    constructor(private readonly loanRepository: LoanRepository) {}

    async execute(loanID: string) { 
        return this.loanRepository.getLoanByID(loanID);
    }
}