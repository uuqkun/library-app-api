import Loan from "../entities/Loan";

export interface LoanRepository {
    getAllLoans(): Promise<Loan[]>;
    getLoanByID(LoanID: string): Promise<Loan>;
    createLoan(loan: Loan): Promise<void>;
    updateLoan(LoanID: string): Promise<void>;
    deleteLoan(LoanID: string): Promise<void>;
    getLoan(req: any): Promise<any>;
}