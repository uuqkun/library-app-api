"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MongoDBBookRepository_1 = require("../../database/MongoDBBookRepository");
const books_1 = require("../../../usecases/books");
const ResponseError_1 = require("../../../error/ResponseError");
const bookRoutes = express_1.default.Router();
const mongoURI = "mongodb://localhost:27017/library";
const bookRepository = new MongoDBBookRepository_1.MongoDBBookRepository(mongoURI);
// routes
bookRoutes.get("/books", async (req, res) => {
    try {
        // ESTABLISH CONNECTION
        await bookRepository.connect();
        // INSTANTIATE NEW GET ALL BOOKS USECASE
        const getAllBooks = new books_1.GetAllBooks(bookRepository);
        // EXECUTE QUERIES
        const books = await getAllBooks.execute();
        // CLOSE CONNECTION
        await bookRepository.disconnect();
        // RETURN RESPONSE
        res.json({ data: books });
    }
    catch (error) {
        throw new ResponseError_1.ResponseError(500, "Internal server errors");
    }
});
bookRoutes.get("/books/:ISBN", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await bookRepository.connect();
        // RETRIEVE MEMBER ID
        const ISBN = req.params.ISBN;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const getBookByISBN = new books_1.GetBookByISBN(bookRepository);
        // EXECUTE QUERIES
        const books = await getBookByISBN.execute(ISBN);
        // CLOSE CONNECTION
        await bookRepository.disconnect();
        // RETURN RESPONSE
        res.json({ data: books });
    }
    catch (error) {
        next(error);
    }
});
bookRoutes.post("/books", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await bookRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const insertBook = new books_1.InsertBook(bookRepository);
        // EXECUTE QUERIES
        await insertBook.execute(body);
        // CLOSE CONNECTION
        await bookRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Added book data!" });
    }
    catch (error) {
        next(error);
    }
});
bookRoutes.patch("/books/:ISBN", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await bookRepository.connect();
        // RETRIEVE MEMBER DATA
        const body = req.body;
        const ISBN = req.params.ISBN;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const updateBook = new books_1.UpdateBook(bookRepository);
        // EXECUTE QUERIES
        await updateBook.execute(ISBN, body);
        // CLOSE CONNECTION
        await bookRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Updated book data!" });
    }
    catch (error) {
        next(error);
    }
});
bookRoutes.delete("/books/:ISBN", async (req, res, next) => {
    try {
        // ESTABLISH CONNECTION
        await bookRepository.connect();
        // RETRIEVE MEMBER ID
        const ISBN = req.params.ISBN;
        // INSTANTIATE NEW CREATE MEMBER USECASE
        const deleteBook = new books_1.DeleteBook(bookRepository);
        // EXECUTE QUERIES
        await deleteBook.execute(ISBN);
        // CLOSE CONNECTION
        await bookRepository.disconnect();
        // RETURN RESPONSE
        res.status(201).json({ message: "Book deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = bookRoutes;
//# sourceMappingURL=bookRoutes.js.map