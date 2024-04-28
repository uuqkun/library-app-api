"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReservations = void 0;
class GetReservations {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute() {
        return this.reservationRepository.getReservations();
    }
}
exports.GetReservations = GetReservations;
//# sourceMappingURL=GetReservations.js.map