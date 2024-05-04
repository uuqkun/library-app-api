"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetReservations {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(req) {
        return this.reservationRepository.getReservations(req);
    }
}
exports.default = GetReservations;
//# sourceMappingURL=GetReservations.js.map