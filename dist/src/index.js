"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const memberRoutes_1 = __importDefault(require("./frameworks/express/routes/memberRoutes"));
const bookRoutes_1 = __importDefault(require("./frameworks/express/routes/bookRoutes"));
const ErrorMiddleware_1 = require("./frameworks/express/middlewares/ErrorMiddleware");
const loanRoutes_1 = require("./frameworks/express/routes/loanRoutes");
const reservationRoutes_1 = __importDefault(require("./frameworks/express/routes/reservationRoutes"));
exports.app = (0, express_1.default)();
const PORT = 3000;
exports.app.use(express_1.default.json());
exports.app.use("/api", memberRoutes_1.default);
exports.app.use("/api", bookRoutes_1.default);
exports.app.use("/api", loanRoutes_1.loanRoutes);
exports.app.use("/api", reservationRoutes_1.default);
exports.app.use(ErrorMiddleware_1.ErrorMiddleware);
exports.server = exports.app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map