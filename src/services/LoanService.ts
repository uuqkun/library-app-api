import { Db, MongoClient, ObjectId } from "mongodb";
import { ResponseError } from "../error/ResponseError";
import { LoanRepository } from "../repositories/LoanRepository";
import Loan from "../entities/Loan";
import { validate } from "../entities/validators/validation";
import {
  createLoanValidation,
  getLoanByIdValidation,
  getLoanValidation,
} from "../entities/validators/loanValidation";
import { Request } from "express";

export class LoanService implements LoanRepository {
  private client: MongoClient;
  private db: Db;
  private readonly collectionName: string = "loans";

  constructor(mongoURI: string) {
    this.client = new MongoClient(mongoURI);
    this.db = this.client.db();
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.close();
  }

  async getAllLoans(): Promise<Loan[]> {
    // GET ALL LOANS
    const loans = await this.db
      .collection(this.collectionName)
      .find()
      .toArray();

    return loans.map((loan: Loan) => {
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

  async getLoanByID(reqLoanID: string): Promise<Loan> {
    // GET THE ID
    const { LoanID } = await validate(getLoanByIdValidation, {
      LoanID: reqLoanID,
    });

    // FIND LOAN
    const collection = this.db.collection(this.collectionName);
    const loan = await collection.findOne({ LoanID: LoanID });

    // THROW ERROR IF NOT FOUND
    if (!loan) throw new ResponseError(404, "Loan not found");

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

  async createLoan(loan: Loan): Promise<void> {
    const { MemberID, ISBN, ...data } = validate(createLoanValidation, {
      ...loan,
    });

    const isBookExist = await this.db
      .collection("books")
      .findOne({ ISBN: ISBN });

    if (!isBookExist) throw new ResponseError(404, "Book not found");

    const collection = this.db.collection(this.collectionName);

    const isLoanExist = await collection.findOne({
      MemberID: MemberID,
      ISBN: ISBN,
      ReturnDate: null,
    });

    // CHECK IF MEMBER ALREADY REGISTERED
    if (isLoanExist)
      throw new ResponseError(
        409,
        "Loan already exist, please return book first"
      );

    // INSERT LOAN TO DB
    data.MemberID = MemberID;
    data.ISBN = ISBN;

    const lastLoan = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    // COMPOSE NEW MEMBER ID
    const LastLoanID = lastLoan.length > 0 ? lastLoan[0].LoanID : "L000";
    const formattedID: number = parseInt(LastLoanID.slice(1)) + 1;
    const nextLoanID = `L${formattedID.toString().padStart(3, "0")}`;
    data.LoanID = nextLoanID;

    // COMPOSE REGISTRATION DATE
    data.LoanDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    data.DueDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${
      new Date().getDate() + 7
    }`;
    data.ReturnDate = null;
    data.Fines = 0;

    // DECREMENT AVAILABLE COPIES
    await this.db
      .collection("books")
      .updateOne({ ISBN: ISBN }, { $inc: { AvailableCopies: -1 } });

    // INSERT MEMBER TO DB
    await collection.insertOne({ ...data });
  }

  async updateLoan(LoanID: string): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    // FIND LOAN
    const loan = await collection.findOne({ LoanID: LoanID });

    // CHECK IF LOAN EXIST
    if (!loan) throw new ResponseError(404, "Loan not found");

    // UPDATE RETURN DATE
    const today = `${new Date().getFullYear()}-${
      new Date().getUTCMonth() + 1
    }-${new Date().getDate()}`;

    // UPDATE LOAN
    const dueDate = new Date(loan.DueDate).getTime();
    const returnDate = new Date(today).getTime();

    const difference = Math.ceil((returnDate - dueDate) / (1000 * 3600 * 24));
    console.log(dueDate, returnDate, difference);

    if (difference > 0) {
      await collection.updateOne(
        {
          LoanID: LoanID,
        },
        {
          $set: {
            ReturnDate: today,
            Fines: difference * 1000,
          },
        }
      );
      return;
    }

    await collection.updateOne(
      { LoanID: LoanID },
      { $set: { ReturnDate: today } }
    );
  }

  async deleteLoan(LoanID: string): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    // FIND LOAN
    const loan = await collection.findOneAndDelete({ LoanID: LoanID });

    // CHECK IF LOAN EXIST
    if (!loan) throw new ResponseError(404, "Loan not found");
  }

  async getLoan(req: any): Promise<any> {
    const { MemberID, Name } = validate(getLoanValidation, req);
    const collection = this.db.collection(this.collectionName);
    let result = {};

    console.info(req);

    // FIND LOAN BY MEMBER ID
    if (MemberID) {
      const loan = await collection.findOne({ MemberID: MemberID });

      if (!loan) throw new ResponseError(404, "Loan not found");

      const member = await this.db.collection("members").findOne({ MemberID });

      const book = await this.db
        .collection("books")
        .findOne({ ISBN: loan.ISBN });

      result = {
        _id: loan._id,
        LoanID: loan.LoanID,
        ISBN: loan.ISBN,
        LoanDate: loan.LoanDate,
        DueDate: loan.DueDate,
        ReturnDate: loan.ReturnDate,
        Fines: loan.Fines,
        book: book
          ? {
              Title: book.Title,
              Author: book.Author,
              Category: book.Category,
              PublishYear: book.PublishYear,
              Publisher: book.Publisher,
            }
          : "Book not found",
        member: {
          MemberID: loan.MemberID,
          Name: member.Name,
          Email: member.Email,
          Phone: member.Phone,
        },
      };

      console.log(result);

      return result;
    }

    // FIND LOAN BY MEMBER NAME
    const member = await this.db
      .collection("members")
      .findOne({ Name: { $regex: new RegExp(`^${Name}`, "i") } });

    if (!member) throw new ResponseError(404, "Member not found");

    const loan = await collection.findOne({ MemberID: member.MemberID });

    if (!loan) throw new ResponseError(404, "Loan not found");

    const book = await this.db.collection("books").findOne({ ISBN: loan.ISBN });

    result = {
      _id: loan._id,
      LoanID: loan.LoanID,
      ISBN: loan.ISBN,
      LoanDate: loan.LoanDate,
      DueDate: loan.DueDate,
      ReturnDate: loan.ReturnDate,
      Fines: loan.Fines,
      book: book
        ? {
            Title: book.Title,
            Author: book.Author,
            Category: book.Category,
            PublishYear: book.PublishYear,
            Publisher: book.Publisher,
          }
        : "Book not found",
      member: {
        MemberID: loan.MemberID,
        Name: member.Name,
        Email: member.Email,
        Phone: member.Phone,
      },
    };

    return result;
  }
}
