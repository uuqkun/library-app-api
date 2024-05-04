import { Reservation } from "../../entities/Reservation";
import { ReservationRepository } from "../../repositories/ReservationRepository";

export default class CreateReservation {
  constructor(private reservationRepository: ReservationRepository) {}

  async execute(reservation: Reservation) {
    return this.reservationRepository.createReservation(reservation);
  }
}
