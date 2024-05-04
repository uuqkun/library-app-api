import { ReservationRepository } from "../../repositories/ReservationRepository";

export default class GetReservations { 
    constructor(private reservationRepository: ReservationRepository) {}

    async execute(req: any) { 
        return this.reservationRepository.getReservations(req);
    }
}