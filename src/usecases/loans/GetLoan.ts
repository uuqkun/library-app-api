import Loan from "../../entities/Loan";
import { LoanRepository } from "../../interfaces/repositories/LoanRepository";

export default class GetLoan { 
    constructor(private readonly loanRepository: LoanRepository) {}

    async execute(req: any): Promise<Loan> { 
        return this.loanRepository.getLoan(req);
    }
}