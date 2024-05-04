"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReservationService_1 = require("../../mongo/ReservationService");
const reservations_1 = require("../../../usecases/reservations");
const mongoURI = "mongodb://localhost:27017/library";
const reservationRepository = new ReservationService_1.ReservationService(mongoURI);
const getReservations = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // INSTANTIATE NEW GET ALL USECASES
        const getReservations = new reservations_1.GetReservations(reservationRepository);
        // EXECUTE QUERIES
        const results = await getReservations.execute(req.query);
        // CLOSE CONNECTION
        await reservationRepository.disconnect();
        // RETURN RESPONSE
        res.json({ data: results });
    }
    catch (error) {
        next(error);
    }
};
const createReservation = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const createReservation = new reservations_1.CreateReservation(reservationRepository);
        // EXECUTE QUERIES
        await createReservation.execute(body);
        // CLOSE CONNECTION
        await reservationRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Created Reservation!" });
    }
    catch (error) {
        next(error);
    }
};
const updateReservation = async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // RETRIEVE MEMBER DATA
        const { ReservationID, Status } = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const updateReservation = new reservations_1.UpdateReservationStatus(reservationRepository);
        // EXECUTE QUERIES
        await updateReservation.execute(ReservationID, Status);
        // CLOSE CONNECTION
        await reservationRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Updated Reservation!" });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { getReservations, createReservation, updateReservation };
//# sourceMappingURL=ReservationController.js.map