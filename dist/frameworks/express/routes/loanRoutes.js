"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRoutes = void 0;
const express_1 = __importDefault(require("express"));
const LoanService_1 = require("../../database/LoanService");
const GetAllLoans_1 = __importDefault(require("../../../usecases/loans/GetAllLoans"));
const GetLoanById_1 = __importDefault(require("../../../usecases/loans/GetLoanById"));
const CreateLoan_1 = __importDefault(require("../../../usecases/loans/CreateLoan"));
const DeleteLoan_1 = __importDefault(require("../../../usecases/loans/DeleteLoan"));
const UpdateLoan_1 = __importDefault(require("../../../usecases/loans/UpdateLoan"));
const GetLoan_1 = __importDefault(require("../../../usecases/loans/GetLoan"));
const router = express_1.default.Router();
exports.loanRoutes = router;
const mongoURI = "mongodb://localhost:27017/library";
const loanRepository = new LoanService_1.LoanService(mongoURI);
router.get("/loans", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        if (req.query.MemberID || req.query.Name) {
            // RETRIEVE MEMBER ID
            const query = req.query;
            // INSTANTIATE NEW CREATE MEMBER USECASE
            const loan = new GetLoan_1.default(loanRepository);
            // EXECUTE QUERIES
            const result = await loan.execute(query);
            // CLOSE CONNECTION
            await loanRepository.disconnect();
            // RETURN RESPONSE
            res.status(201).json({ data: result });
        }
        else {
            // INSTANTIATE NEW GET ALL USECASE
            const getAllLoans = new GetAllLoans_1.default(loanRepository);
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
});
router.get("/loans/:loanID", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER ID
        const loanID = req.params.loanID;
        // INSTANTIATE USECASE
        const getLoanById = new GetLoanById_1.default(loanRepository);
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
});
router.post("/loans", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const createLoan = new CreateLoan_1.default(loanRepository);
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
});
router.patch("/loans/:loanID", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER DATA
        const loanID = req.params.loanID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const updateLoan = new UpdateLoan_1.default(loanRepository);
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
});
router.delete("/loans/:loanID", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await loanRepository.connect();
        // RETRIEVE MEMBER ID
        const loanID = req.params.loanID;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const deleteLoan = new DeleteLoan_1.default(loanRepository);
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
});
//# sourceMappingURL=loanRoutes.js.map