import { ReservationRepository } from "../../interfaces/repositories/ReservationRepository";

export class GetReservations { 
    constructor(private reservationRepository: ReservationRepository) {}

    async execute(req: any) { 
        return this.reservationRepository.getReservations(req);
    }
}