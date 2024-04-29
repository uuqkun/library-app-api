"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReservationService_1 = require("../../database/ReservationService");
const GetReservations_1 = require("../../../usecases/reservations/GetReservations");
const CreateReservation_1 = require("../../../usecases/reservations/CreateReservation");
const UpdateReservationStatus_1 = require("../../../usecases/reservations/UpdateReservationStatus");
const reservationRoutes = express_1.default.Router();
const mongoURI = "mongodb://localhost:27017/library";
const reservationRepository = new ReservationService_1.ReservationService(mongoURI);
// routes
reservationRoutes.get("/reservations", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // INSTANTIATE NEW GET ALL USECASES
        const getReservations = new GetReservations_1.GetReservations(reservationRepository);
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
});
reservationRoutes.post("/reservations", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const createReservation = new CreateReservation_1.CreateReservation(reservationRepository);
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
});
reservationRoutes.patch("/reservations/", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // RETRIEVE MEMBER DATA
        const { ReservationID, Status } = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const updateReservation = new UpdateReservationStatus_1.UpdateReservationStatus(reservationRepository);
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
});
exports.default = reservationRoutes;
//# sourceMappingURL=reservationRoutes.js.map