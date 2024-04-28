import { ReservationRepository } from "../../interfaces/repositories/ReservationRepository";

export class UpdateReservationStatus {
  constructor(private reservationRepository: ReservationRepository) {}

  async execute(ReservationID: string, Status: string) {
    return this.reservationRepository.updateReservationStatus(ReservationID, Status);
  }
}
