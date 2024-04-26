import express, { NextFunction, Request, Response } from "express";
import { MongoDBBookRepository } from "../../database/MongoDBBookRepository";
import {
  DeleteBook,
  GetAllBooks,
  GetBookByISBN,
  InsertBook,
  UpdateBook,
} from "../../../usecases/books";
import { ResponseError } from "../../../error/ResponseError";

const bookRoutes = express.Router();
const mongoURI = "mongodb://localhost:27017/library";
const bookRepository = new MongoDBBookRepository(mongoURI);

// routes
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    // ESTABLISH CONNECTION
    await bookRepository.connect();

    // INSTANTIATE NEW GET ALL BOOKS USECASE
    const getAllBooks = new GetAllBooks(bookRepository);

    // EXECUTE QUERIES
    const books = await getAllBooks.execute();

    // CLOSE CONNECTION
    await bookRepository.disconnect();

    // RETURN RESPONSE
    res.json({ data: books });
  } catch (error) {
    throw new ResponseError(500, "Internal server errors");
  }
});

bookRoutes.get(
  "/books/:ISBN",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await bookRepository.connect();

      // RETRIEVE MEMBER ID
      const ISBN = req.params.ISBN;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const getBookByISBN = new GetBookByISBN(bookRepository);

      // EXECUTE QUERIES
      const books = await getBookByISBN.execute(ISBN);

      // CLOSE CONNECTION
      await bookRepository.disconnect();

      // RETURN RESPONSE
      res.json({ data: books });
    } catch (error) {
      next(error);
    }
  }
);

bookRoutes.post(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await bookRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const insertBook = new InsertBook(bookRepository);

      // EXECUTE QUERIES
      await insertBook.execute(body);

      // CLOSE CONNECTION
      await bookRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Added book data!" });
    } catch (error) {
      next(error);
    }
  }
);

bookRoutes.patch(
  "/books/:ISBN",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await bookRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;
      const ISBN = req.params.ISBN;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const updateBook = new UpdateBook(bookRepository);

      // EXECUTE QUERIES
      await updateBook.execute(ISBN, body);

      // CLOSE CONNECTION
      await bookRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Updated book data!" });
    } catch (error) {
      next(error);
    }
  }
);

bookRoutes.delete(
  "/books/:ISBN",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await bookRepository.connect();

      // RETRIEVE MEMBER ID
      const ISBN = req.params.ISBN;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const deleteBook = new DeleteBook(bookRepository);

      // EXECUTE QUERIES
      await deleteBook.execute(ISBN);

      // CLOSE CONNECTION
      await bookRepository.disconnect();

      // RETURN RESPONSE
      res.status(201).json({ message: "Book deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

export default bookRoutes;
