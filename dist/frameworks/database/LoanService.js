"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const mongodb_1 = require("mongodb");
const ResponseError_1 = require("../../error/ResponseError");
const validation_1 = require("../../entities/validators/validation");
const loanValidation_1 = require("../../entities/validators/loanValidation");
class LoanService {
    constructor(mongoURI) {
        this.collectionName = "loans";
        this.client = new mongodb_1.MongoClient(mongoURI);
        this.db = this.client.db();
    }
    async connect() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.close();
    }
    async getAllLoans() {
        // GET ALL LOANS
        const loans = await this.db
            .collection(this.collectionName)
            .find()
            .toArray();
        return loans.map((loan) => {
            return {
                _id: loan._id,
                LoanID: loan.LoanID,
                MemberID: loan.MemberID,
                ISBN: loan.ISBN,
                LoanDate: loan.LoanDate,
                DueDate: loan.DueDate,
                ReturnDate: loan.ReturnDate,
                Fines: loan.Fines,
            };
        });
    }
    async getLoanByID(reqLoanID) {
        // GET THE ID
        const { LoanID } = await (0, validation_1.validate)(loanValidation_1.getLoanByIdValidation, {
            LoanID: reqLoanID,
        });
        // FIND LOAN
        const collection = this.db.collection(this.collectionName);
        const loan = await collection.findOne({ LoanID: LoanID });
        // THROW ERROR IF NOT FOUND
        if (!loan)
            throw new ResponseError_1.ResponseError(404, "Loan not found");
        const { _id, MemberID, ISBN, LoanDate, DueDate, ReturnDate, Fines } = loan;
        return {
            _id: _id,
            LoanID: LoanID,
            MemberID: MemberID,
            ISBN: ISBN,
            LoanDate: LoanDate,
            DueDate: DueDate,
            ReturnDate: ReturnDate,
            Fines: Fines,
        };
    }
    async createLoan(loan) {
        const { MemberID, ISBN, ...data } = (0, validation_1.validate)(loanValidation_1.createLoanValidation, {
            ...loan,
        });
        const collection = this.db.collection(this.collectionName);
        const isLoanExist = await collection.findOne({
            MemberID: MemberID,
            ISBN: ISBN,
            ReturnDate: null,
        });
        // CHECK IF MEMBER ALREADY REGISTERED
        if (isLoanExist)
            throw new ResponseError_1.ResponseError(409, "Loan already exist, please return book first");
        // INSERT LOAN TO DB
        data.MemberID = MemberID;
        data.ISBN = ISBN;
        const lastLoan = await collection
            .find()
            .sort({ _id: -1 })
            .limit(1)
            .toArray();
        // COMPOSE NEW MEMBER ID
        const LastLoanID = lastLoan.length > 0 ? lastLoan[0].LoanID : "LO000";
        const formattedID = parseInt(LastLoanID.slice(1)) + 1;
        const nextLoanID = `L${formattedID.toString().padStart(3, "0")}`;
        data.LoanID = nextLoanID;
        // COMPOSE REGISTRATION DATE
        data.LoanDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
        data.DueDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate() + 7}`;
        data.ReturnDate = null;
        data.Fines = 0;
        // DECREMENT AVAILABLE COPIES
        await this.db
            .collection("books")
            .updateOne({ ISBN: ISBN }, { $inc: { AvailableCopies: -1 } });
        // INSERT MEMBER TO DB
        await collection.insertOne({ ...data });
    }
    async updateLoan(LoanID) {
        const collection = this.db.collection(this.collectionName);
        // FIND LOAN
        const loan = await collection.findOne({ LoanID: LoanID });
        // CHECK IF LOAN EXIST
        if (!loan)
            throw new ResponseError_1.ResponseError(404, "Loan not found");
        // UPDATE RETURN DATE
        const today = `${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getDate()}`;
        // UPDATE LOAN
        const dueDate = new Date(loan.DueDate).getTime();
        const returnDate = new Date(today).getTime();
        const difference = Math.ceil((returnDate - dueDate) / (1000 * 3600 * 24));
        console.log(dueDate, returnDate, difference);
        if (difference > 0) {
            await collection.updateOne({
                LoanID: LoanID,
            }, {
                $set: {
                    ReturnDate: today,
                    Fines: difference * 1000,
                },
            });
            return;
        }
        await collection.updateOne({ LoanID: LoanID }, { $set: { ReturnDate: today } });
    }
    async deleteLoan(LoanID) {
        const collection = this.db.collection(this.collectionName);
        // FIND LOAN
        const loan = await collection.findOneAndDelete({ LoanID: LoanID });
        // CHECK IF LOAN EXIST
        if (!loan)
            throw new ResponseError_1.ResponseError(404, "Loan not found");
    }
    async getLoan(req) {
        const { MemberID, Name } = (0, validation_1.validate)(loanValidation_1.getLoanValidation, req);
        const collection = this.db.collection(this.collectionName);
        let result = {};
        console.info(req);
        // FIND LOAN BY MEMBER ID
        if (MemberID) {
            const loan = await collection.findOne({ MemberID: MemberID });
            console.info(loan);
            if (!loan)
                throw new ResponseError_1.ResponseError(404, "Loan not found");
            const member = await this.db.collection("members").findOne({ MemberID });
            if (!member)
                throw new ResponseError_1.ResponseError(404, "Member not found");
            console.info(member);
            const book = await this.db
                .collection("books")
                .findOne({ ISBN: loan.ISBN })
                .catch((err) => {
                throw new ResponseError_1.ResponseError(404, err.message || "Book not found");
            });
            console.info(book);
            result = {
                _id: loan._id,
                LoanID: loan.LoanID,
                LoanDate: loan.LoanDate,
                DueDate: loan.DueDate,
                ReturnDate: loan.ReturnDate,
                Fines: loan.Fines,
                book: {
                    ISBN: book.ISBN,
                    Title: book.Title,
                },
                member: {
                    MemberID: loan.MemberID,
                    Name: member.Name,
                },
            };
            console.log(result);
            return result;
        }
        // FIND LOAN BY MEMBER NAME
        const member = await this.db.collection("members").findOne({ Name: Name });
        const loan = await collection.findOne({ MemberID: member.MemberID });
        const book = await this.db.collection("books").findOne({ ISBN: loan.ISBN });
        result = {
            _id: loan._id,
            LoanID: loan.LoanID,
            LoanDate: loan.LoanDate,
            DueDate: loan.DueDate,
            ReturnDate: loan.ReturnDate,
            Fines: loan.Fines,
            book: {
                ISBN: book.ISBN,
                Title: book.Title,
            },
            member: {
                MemberID: loan.MemberID,
                Name: member.Name,
            },
        };
        return result;
    }
}
exports.LoanService = LoanService;
//# sourceMappingURL=LoanService.js.map