import { Reservation } from "../../entities/Reservation";
import { ReservationRepository } from "../../interfaces/repositories/ReservationRepository";

export class CreateReservation {
  constructor(private reservationRepository: ReservationRepository) {}

  async execute(reservation: Reservation) {
    return this.reservationRepository.createReservation(reservation);
  }
}
