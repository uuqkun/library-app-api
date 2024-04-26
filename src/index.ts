import express, { Express, Request, Response } from "express";
import memberRoutes from "./frameworks/express/routes/memberRoutes";
import { ErrorMiddleware } from "./frameworks/express/middlewares/ErrorMiddleware";

const app: Express = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", memberRoutes);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
