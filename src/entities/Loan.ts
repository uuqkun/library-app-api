import { ObjectId } from "mongodb";

export default interface Loan {
  _id: ObjectId;
  LoanID: string;
  MemberID: string;
  ISBN: string;
  LoanDate: string;
  DueDate: string;
  ReturnDate: string;
  Fines: number;
}
