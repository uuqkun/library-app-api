"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReservationStatus = void 0;
class UpdateReservationStatus {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async execute(ReservationID, Status) {
        return this.reservationRepository.updateReservationStatus(ReservationID, Status);
    }
}
exports.UpdateReservationStatus = UpdateReservationStatus;
//# sourceMappingURL=UpdateReservationStatus.js.map