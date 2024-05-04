"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRoutes = void 0;
const express_1 = __importDefault(require("express"));
const LoanController_1 = __importDefault(require("../controllers/LoanController"));
const router = express_1.default.Router();
exports.loanRoutes = router;
router.get("/loans", LoanController_1.default.getLoan);
router.get("/loans/:loanID", LoanController_1.default.getLoanById);
router.post("/loans", LoanController_1.default.createLoan);
router.patch("/loans/:loanID", LoanController_1.default.updateLoan);
router.delete("/loans/:loanID", LoanController_1.default.deleteLoan);
//# sourceMappingURL=loanRoutes.js.map