"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const mongodb_1 = require("mongodb");
class ReservationService {
    constructor(mongoURI) {
        this.collectionName = "reservations";
        this.client = new mongodb_1.MongoClient(mongoURI);
        this.db = this.client.db();
    }
    async connect() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.close();
    }
    async getReservations() {
        const collection = this.db.collection(this.collectionName);
        const results = await collection.find().toArray();
        return results.map((result) => {
            return {
                ReservationID: result.ReservationID,
                MemberID: result.MemberID,
                ISBN: result.ISBN,
                ReservationDate: result.ReservationDate,
                Status: result.Status,
            };
        });
    }
    async createReservation(reservation) {
        throw new Error("Method not implemented.");
    }
    async updateReservationStatus(ReservationID, data) {
        throw new Error("Method not implemented.");
    }
    async cancelReservation(ReservationID) {
        throw new Error("Method not implemented.");
    }
}
exports.ReservationService = ReservationService;
//# sourceMappingURL=ReservationService.js.map