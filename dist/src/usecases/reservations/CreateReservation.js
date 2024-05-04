"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateReservation {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(reservation) {
        return this.reservationRepository.createReservation(reservation);
    }
}
exports.default = CreateReservation;
//# sourceMappingURL=CreateReservation.js.map