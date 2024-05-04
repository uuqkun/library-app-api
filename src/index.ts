import express, { Express, Request, Response } from "express";

import memberRoutes from "./routes/memberRoutes";
import bookRoutes from "./routes/bookRoutes";

import { ErrorMiddleware } from "./middlewares/ErrorMiddleware";
import { loanRoutes } from "./routes/loanRoutes";
import reservationRoutes from "./routes/reservationRoutes";

export const app: Express = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", memberRoutes);
app.use("/api", bookRoutes);
app.use("/api", loanRoutes);
app.use("/api", reservationRoutes);

app.use(ErrorMiddleware);

export const server = app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
