import { LoanRepository } from "../../interfaces/repositories/LoanRepository";

export default class GetLoanByID { 
    constructor(private readonly loanRepository: LoanRepository) {}

    async execute(loanID: string) { 
        return this.loanRepository.getLoanByID(loanID);
    }
}