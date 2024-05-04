import { NextFunction, Request, Response } from "express";
import { LoanService } from "../services/LoanService";
import {
  CreateLoan,
  DeleteLoan,
  GetAllLoans,
  GetLoan,
  GetLoanByID,
  UpdateLoan,
} from "../usecases/loans";

const mongoURI = "mongodb://localhost:27017/library";
const loanRepository = new LoanService(mongoURI);

const getLoan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ESTABLISH CONNECTION
    await loanRepository.connect();

    if (req.query.MemberID || req.query.Name) {
      // RETRIEVE MEMBER ID
      const query = req.query;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const loan = new GetLoan(loanRepository);

      // EXECUTE QUERIES
      const result = await loan.execute(query);

      // CLOSE CONNECTION
      await loanRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ data: result });
    } else {
      // INSTANTIATE NEW GET ALL USECASE
      const getAllLoans = new GetAllLoans(loanRepository);

      // EXECUTE QUERIES
      const result = await getAllLoans.execute();

      // CLOSE CONNECTION
      await loanRepository.disconnect();

      // RETURN RESPONSE
      res.json({ data: result });
    }
  } catch (error) {
    next(error);
  }
};

const getLoanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ESTABLISH CONNECTION
    await loanRepository.connect();

    // RETRIEVE MEMBER ID
    const loanID = req.params.loanID;

    // INSTANTIATE USECASE
    const getLoanById = new GetLoanByID(loanRepository);

    // EXECUTE QUERIES
    const result = await getLoanById.execute(loanID);

    // CLOSE CONNECTION
    await loanRepository.disconnect();

    // RETURN RESPONSE
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const createLoan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ESTABLISH CONNECTION
    await loanRepository.connect();

    // RETRIEVE MEMBER DATA
    const body = req.body;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const createLoan = new CreateLoan(loanRepository);

    // EXECUTE QUERIES
    await createLoan.execute(body);

    // CLOSE CONNECTION
    await loanRepository.disconnect();

    // RETURN RESPONSE
    res.status(201).json({ message: "Added new loan!" });
  } catch (error) {
    next(error);
  }
};

const updateLoan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ESTABLISH CONNECTION
    await loanRepository.connect();

    // RETRIEVE MEMBER DATA
    const loanID = req.params.loanID;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const updateLoan = new UpdateLoan(loanRepository);

    // EXECUTE QUERIES
    await updateLoan.execute(loanID);

    // CLOSE CONNECTION
    await loanRepository.disconnect();

    // RETURN RESPONSE
    res.status(201).json({ message: "Updated book data!" });
  } catch (error) {
    next(error);
  }
};

const deleteLoan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ESTABLISH CONNECTION
    await loanRepository.connect();

    // RETRIEVE MEMBER ID
    const loanID = req.params.loanID;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const deleteLoan = new DeleteLoan(loanRepository);

    // EXECUTE QUERIES
    await deleteLoan.execute(loanID);

    // CLOSE CONNECTION
    await loanRepository.disconnect();

    // RETURN RESPONSE
    res.status(201).json({ message: "Loan deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export default { getLoan, getLoanById, createLoan, updateLoan, deleteLoan };
