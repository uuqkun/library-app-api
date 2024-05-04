import { Reservation } from "../entities/Reservation";

export interface ReservationRepository {
  getReservations(req: any): Promise<Reservation[] | Reservation>;
  createReservation(reservation: Reservation): Promise<void>;
  updateReservationStatus(ReservationID: string, Status: string): Promise<void>;
}
