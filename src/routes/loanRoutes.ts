import express from "express";
import LoanController from "../controllers/LoanController";

const router = express.Router();

router.get("/loans", LoanController.getLoan);
router.get("/loans/:loanID", LoanController.getLoanById);
router.post("/loans", LoanController.createLoan);
router.patch("/loans/:loanID", LoanController.updateLoan);
router.delete("/loans/:loanID", LoanController.deleteLoan);

export { router as loanRoutes };
