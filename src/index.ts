import express, { Express, Request, Response } from "express";

import memberRoutes from "./frameworks/express/routes/memberRoutes";
import bookRoutes from "./frameworks/express/routes/bookRoutes";

import { ErrorMiddleware } from "./frameworks/express/middlewares/ErrorMiddleware";
import { loanRoutes } from "./frameworks/express/routes/loanRoutes";

const app: Express = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", memberRoutes);
app.use("/api", bookRoutes);
app.use("/api", loanRoutes);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
