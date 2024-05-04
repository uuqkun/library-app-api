import { LoanRepository } from "../../repositories/LoanRepository";

export default class GetAllLoans { 
    constructor(private readonly loanRepository: LoanRepository) {}

    async execute() { 
        return this.loanRepository.getAllLoans();
    }
}