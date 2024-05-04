"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateReservationStatus {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(ReservationID, Status) {
        return this.reservationRepository.updateReservationStatus(ReservationID, Status);
    }
}
exports.default = UpdateReservationStatus;
//# sourceMappingURL=UpdateReservationStatus.js.map