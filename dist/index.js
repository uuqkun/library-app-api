"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberRoutes_1 = __importDefault(require("./frameworks/express/routes/memberRoutes"));
const bookRoutes_1 = __importDefault(require("./frameworks/express/routes/bookRoutes"));
const ErrorMiddleware_1 = require("./frameworks/express/middlewares/ErrorMiddleware");
const loanRoutes_1 = require("./frameworks/express/routes/loanRoutes");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use("/api", memberRoutes_1.default);
app.use("/api", bookRoutes_1.default);
app.use("/api", loanRoutes_1.loanRoutes);
app.use(ErrorMiddleware_1.ErrorMiddleware);
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map