import { ObjectId } from "mongodb";

export interface Reservation {
  _id: ObjectId
  ReservationID: string;
  MemberID: string;
  ISBN: string;
  ReservationDate: string;
  Status: string;
}
