import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/ResponseError";
import { BookService } from "../services/BookService";
import {
  DeleteBook,
  GetAllBooks,
  GetBookByISBN,
  InsertBook,
  UpdateBook,
} from "../usecases/books";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/library";
const bookRepository = new BookService(mongoURI);

const getBooks = async (req: Request, res: Response) => {
  try {
    // ESTABLISH CONNECTION
    await bookRepository.connect();

    // INSTANTIATE NEW GET ALL BOOKS USECASE
    const usecase = new GetAllBooks(bookRepository);

    // EXECUTE QUERIES
    const books = await usecase.execute();

    // CLOSE CONNECTION
    await bookRepository.disconnect();

    // RETURN RESPONSE
    res.json({ data: books });
  } catch (error) {
    throw new ResponseError(500, "Internal server errors");
  }
};

const getBookByISBN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

const insertBook = async (req: Request, res: Response, next: NextFunction) => {
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
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
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
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
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
};

export default { getBooks, getBookByISBN, insertBook, updateBook, deleteBook };
