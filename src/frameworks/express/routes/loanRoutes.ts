import express, { NextFunction, Request, Response } from "express";

import { LoanService } from "../../database/LoanService";
import GetAllLoans from "../../../usecases/loans/GetAllLoans";
import GetLoanByID from "../../../usecases/loans/GetLoanById";
import CreateLoan from "../../../usecases/loans/CreateLoan";
import DeleteLoan from "../../../usecases/loans/DeleteLoan";
import UpdateLoan from "../../../usecases/loans/UpdateLoan";
import GetLoan from "../../../usecases/loans/GetLoan";

const router = express.Router();
const mongoURI = "mongodb://localhost:27017/library";
const loanRepository = new LoanService(mongoURI);

router.get("/loans", async (req: Request, res: Response, next: NextFunction) => {
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
});

router.get(
  "/loans/:loanID",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

router.post(
  "/loans",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

router.patch(
  "/loans/:loanID",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

router.delete(
  "/loans/:loanID",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export { router as loanRoutes };
