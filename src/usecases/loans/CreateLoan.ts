import Loan from "../../entities/Loan";
import { LoanRepository } from "../../repositories/LoanRepository";

export default class CreateLoan {
  constructor(private readonly loanRepository: LoanRepository) {}

  async execute(loan: Loan): Promise<void> {
    return this.loanRepository.createLoan(loan);
  }
}
