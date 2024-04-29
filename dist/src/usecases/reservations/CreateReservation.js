"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservation = void 0;
class CreateReservation {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(reservation) {
        return this.reservationRepository.createReservation(reservation);
    }
}
exports.CreateReservation = CreateReservation;
//# sourceMappingURL=CreateReservation.js.map