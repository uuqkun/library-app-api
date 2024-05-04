"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReservationController_1 = __importDefault(require("../controllers/ReservationController"));
const reservationRoutes = express_1.default.Router();
// routes
reservationRoutes.get("/reservations", ReservationController_1.default.getReservations);
reservationRoutes.post("/reservations", ReservationController_1.default.createReservation);
reservationRoutes.patch("/reservations/", ReservationController_1.default.updateReservation);
exports.default = reservationRoutes;
//# sourceMappingURL=reservationRoutes.js.map