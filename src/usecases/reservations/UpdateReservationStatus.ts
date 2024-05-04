import { ReservationRepository } from "../../repositories/ReservationRepository";

export default class UpdateReservationStatus {
  constructor(private reservationRepository: ReservationRepository) {}

  async execute(ReservationID: string, Status: string) {
    return this.reservationRepository.updateReservationStatus(ReservationID, Status);
  }
}
