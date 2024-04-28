import express, { NextFunction, Request, Response } from "express";

import { ResponseError } from "../../../error/ResponseError";
import { ReservationService } from "../../database/ReservationService";
import { GetReservations } from "../../../usecases/reservations/GetReservations";
import { CreateReservation } from "../../../usecases/reservations/CreateReservation";
import { UpdateReservationStatus } from "../../../usecases/reservations/UpdateReservationStatus";

const reservationRoutes = express.Router();
const mongoURI = "mongodb://localhost:27017/library";
const reservationRepository = new ReservationService(mongoURI);

// routes
reservationRoutes.get(
  "/reservations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // INSTANTIATE NEW GET ALL USECASES
      const getReservations = new GetReservations(reservationRepository);

      // EXECUTE QUERIES
      const results = await getReservations.execute(req.query);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.json({ data: results });
    } catch (error) {
      next(error);
    }
  }
);

reservationRoutes.post(
  "/reservations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const createReservation = new CreateReservation(reservationRepository);

      // EXECUTE QUERIES
      await createReservation.execute(body);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Created Reservation!" });
    } catch (error) {
      next(error);
    }
  }
);

reservationRoutes.patch(
  "/reservations/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // RETRIEVE MEMBER DATA
      const { ReservationID, Status} = req.body;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const updateReservation = new UpdateReservationStatus(reservationRepository);

      // EXECUTE QUERIES
      await updateReservation.execute(ReservationID, Status);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Updated Reservation!" });
    } catch (error) {
      next(error);
    }
  }
);

export default reservationRoutes;
