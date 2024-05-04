import express from "express";
import ReservationController from "../controllers/ReservationController";

const reservationRoutes = express.Router();

// routes
reservationRoutes.get("/reservations", ReservationController.getReservations);
reservationRoutes.post("/reservations", ReservationController.createReservation);
reservationRoutes.patch("/reservations/", ReservationController.updateReservation);

export default reservationRoutes;
