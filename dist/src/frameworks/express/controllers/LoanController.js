"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoanService_1 = require("../../mongo/LoanService");
const loans_1 = require("../../../usecases/loans");
const mongoURI = "mongodb://localhost:27017/library";
const loanRepository = new LoanService_1.LoanService(mongoURI);
const getLoan = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        if (req.query.MemberID || req.query.Name) {
            // RETRIEVE MEMBER ID
            const query = req.query;
            // INSTANTIATE NEW CREATE MEMBER USECASE
            const loan = new loans_1.GetLoan(loanRepository);
            // EXECUTE QUERIES
            const result = await loan.execute(query);
            // CLOSE CONNECTION
            await loanRepository.disconnect();
            // RETURN RESPONSE
            res.status(201).json({ data: result });
        }
        else {
            // INSTANTIATE NEW GET ALL USECASE
            const getAllLoans = new loans_1.GetAllLoans(loanRepository);
            // EXECUTE QUERIES
            const result = await getAllLoans.execute();
            // CLOSE CONNECTION
            await loanRepository.disconnect();
            // RETURN RESPONSE
            res.json({ data: result });
        }
    }
    catch (error) {
        next(error);
    }
};
const getLoanById = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER ID
        const loanID = req.params.loanID;
        // INSTANTIATE USECASE
        const getLoanById = new loans_1.GetLoanByID(loanRepository);
        // EXECUTE QUERIES
        const result = await getLoanById.execute(loanID);
        // CLOSE CONNECTION
        await loanRepository.disconnect();
        // RETURN RESPONSE
        res.json({ data: result });
    }
    catch (error) {
        next(error);
    }
};
const createLoan = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const createLoan = new loans_1.CreateLoan(loanRepository);
        // EXECUTE QUERIES
        await createLoan.execute(body);
        // CLOSE CONNECTION
        await loanRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Added new loan!" });
    }
    catch (error) {
        next(error);
    }
};
const updateLoan = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER DATA
        const loanID = req.params.loanID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const updateLoan = new loans_1.UpdateLoan(loanRepository);
        // EXECUTE QUERIES
        await updateLoan.execute(loanID);
        // CLOSE CONNECTION
        await loanRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Updated book data!" });
    }
    catch (error) {
        next(error);
    }
};
const deleteLoan = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER ID
        const loanID = req.params.loanID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const deleteLoan = new loans_1.DeleteLoan(loanRepository);
        // EXECUTE QUERIES
        await deleteLoan.execute(loanID);
        // CLOSE CONNECTION
        await loanRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Loan deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { getLoan, getLoanById, createLoan, updateLoan, deleteLoan };
//# sourceMappingURL=LoanController.js.map