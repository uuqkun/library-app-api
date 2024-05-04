import { Db, MongoClient, ObjectId } from "mongodb";

import { ResponseError } from "../error/ResponseError";
import { validate } from "../entities/validators/validation";
import { ReservationRepository } from "../repositories/ReservationRepository";
import { Reservation } from "../entities/Reservation";
import { createReservationValidation } from "../entities/validators/reservationValidation";

export class ReservationService implements ReservationRepository {
  private client: MongoClient;
  private db: Db;
  private readonly collectionName: string = "reservations";

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

  async getReservations(req: any): Promise<Reservation[] | Reservation> {
    // INIT COLLECTION
    const collection = this.db.collection(this.collectionName);

    // CATCH ALL REQUEST PARAMETERS
    const { MemberID, Status, ISBN } = req;
    const query = {};

    if (MemberID) query["MemberID"] = MemberID;
    if (Status) query["Status"] = Status;
    if (ISBN) query["ISBN"] = ISBN;

    // BUILD QUERY TO UNFILTERED RESERVATIONS
    const results = await collection.find(query).toArray();

    if (!results.length) throw new ResponseError(404, "No reservations found");

    return results.map((result) => {
      return {
        _id: result._id,
        ReservationID: result.ReservationID,
        MemberID: result.MemberID,
        ISBN: result.ISBN,
        ReservationDate: result.ReservationDate,
        Status: result.Status,
      };
    });
  }

  async createReservation(reservation: Reservation): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    // CHECK IF MEMBER AND BOOK EXISTS
    const member = await this.db
      .collection("members")
      .findOne({ MemberID: reservation.MemberID });

    if (!member) throw new ResponseError(404, "Member not found");

    const book = await this.db
      .collection("books")
      .findOne({ ISBN: reservation.ISBN, AvailableCopies: { $gt: 0 } });

    if (!book)
      throw new ResponseError(
        404,
        `Available copies of this book is ${book.AvailableCopies}`
      );

    // DECREMENT BOOK AVAILABLE COPIES
    await this.db
      .collection("books")
      .updateOne({ ISBN: reservation.ISBN }, { $inc: { AvailableCopies: -1 } });

    // COMPOSE OBJECT ID
    reservation._id = new ObjectId();

    // COMPOSE RESERVATION ID
    const last = await collection.find().sort({ _id: -1 }).limit(1).toArray();

    // COMPOSE NEXT RESERVATION ID
    const lastReserveID = last.length > 0 ? last[0].ReservationID : "R000";
    const formattedID: number = parseInt(lastReserveID.slice(1)) + 1;
    const nextID = `R${formattedID.toString().padStart(3, "0")}`;

    reservation.ReservationID = nextID;

    // SET DEFAULT STATUS
    reservation.Status = "Active";

    // SET RESERVATION DATE
    const today = `${new Date().getFullYear()}-${
      new Date().getUTCMonth() + 1
    }-${new Date().getDate()}`;
    reservation.ReservationDate = today;

    // INSERT RESERVATION TO DB
    await collection.insertOne({ ...reservation });
  }

  async updateReservationStatus(
    ReservationID: string,
    Status: string
  ): Promise<void> {
    const validData = validate(createReservationValidation, {
      ReservationID: ReservationID,
      Status: Status,
    });

    const collection = this.db.collection(this.collectionName);

    // FIND RESERVATION
    const reservation = await collection.findOne({
      ReservationID: validData.ReservationID,
    });

    if (!reservation) throw new ResponseError(404, "Reservation not found");

    // IF STATUS IS CANCELLED, INCREMENT BOOK AVAILABLE COPIES
    if (
      Status.toLowerCase() === "cancel" ||
      Status.toLowerCase() === "fulfilled"
    ) {
      await this.db
        .collection("books")
        .updateOne(
          { ISBN: reservation.ISBN },
          { $inc: { AvailableCopies: 1 } }
        );
    }

    // UPDATE RESERVATION STATUS
    await collection.updateOne(
      { ReservationID: validData.ReservationID },
      {
        $set: {
          Status: validData.Status === "cancel" ? "Cancelled" : "Fulfilled",
        },
      }
    );
  }
}
