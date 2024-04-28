"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReservationService_1 = require("../../database/ReservationService");
const GetReservations_1 = require("../../../usecases/reservations/GetReservations");
const reservationRoutes = express_1.default.Router();
const mongoURI = "mongodb://localhost:27017/library";
const reservationRepository = new ReservationService_1.ReservationService(mongoURI);
// routes
reservationRoutes.get("/reservations", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await reservationRepository.connect();
        // INSTANTIATE NEW GET ALL USECASES
        const getReservations = new GetReservations_1.GetReservations(reservationRepository);
        // EXECUTE QUERIES
        const results = await getReservations.execute();
        // CLOSE CONNECTION
        await reservationRepository.disconnect();
        // RETURN RESPONSE
        res.json({ data: results });
    }
    catch (error) {
        next(error);
    }
});
/*
reservationRoutes.get(
  "/reservations/:ISBN",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // RETRIEVE MEMBER ID
      const ISBN = req.params.ISBN;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const getBookByISBN = new GetBookByISBN(reservationRepository);

      // EXECUTE QUERIES
      const books = await getBookByISBN.execute(ISBN);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.json({ data: books });
    } catch (error) {
      next(error);
    }
  }
);

reservationRoutes.post(
  "/reservations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const insertBook = new InsertBook(reservationRepository);

      // EXECUTE QUERIES
      await insertBook.execute(body);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Added book data!" });
    } catch (error) {
      next(error);
    }
  }
);

reservationRoutes.patch(
  "/reservations/:ISBN",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;
      const ISBN = req.params.ISBN;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const updateBook = new UpdateBook(reservationRepository);

      // EXECUTE QUERIES
      await updateBook.execute(ISBN, body);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Updated book data!" });
    } catch (error) {
      next(error);
    }
  }
);

reservationRoutes.delete(
  "/reservations/:ISBN",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await reservationRepository.connect();

      // RETRIEVE MEMBER ID
      const ISBN = req.params.ISBN;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const deleteBook = new DeleteBook(reservationRepository);

      // EXECUTE QUERIES
      await deleteBook.execute(ISBN);

      // CLOSE CONNECTION
      await reservationRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Book deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
);
*/
exports.default = reservationRoutes;
//# sourceMappingURL=reservationRoutes.js.map