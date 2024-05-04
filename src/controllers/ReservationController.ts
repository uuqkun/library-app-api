import { NextFunction, Request, Response } from "express";

import { ReservationService } from "../services/ReservationService";
import {
  CreateReservation,
  GetReservations,
  UpdateReservationStatus,
} from "../usecases/reservations";

const mongoURI = "mongodb://localhost:27017/library";
const reservationRepository = new ReservationService(mongoURI);

const getReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ESTABLISH CONNECTION
    await reservationRepository.connect();

    // RETRIEVE MEMBER DATA
    const { ReservationID, Status } = req.body;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const updateReservation = new UpdateReservationStatus(
      reservationRepository
    );

    // EXECUTE QUERIES
    await updateReservation.execute(ReservationID, Status);

    // CLOSE CONNECTION
    await reservationRepository.disconnect();

    // RETURN RESPONSE
    res.status(201).json({ message: "Updated Reservation!" });
  } catch (error) {
    next(error);
  }
};

export default { getReservations, createReservation, updateReservation };
