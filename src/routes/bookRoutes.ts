import express from "express";
import BookController from "../controllers/BookController";

const bookRoutes = express.Router();

// Book routes
bookRoutes.get("/books", BookController.getBooks);
bookRoutes.get("/books/:ISBN", BookController.getBookByISBN);
bookRoutes.post("/books", BookController.insertBook);
bookRoutes.patch("/books/:ISBN", BookController.updateBook);
bookRoutes.delete("/books/:ISBN", BookController.deleteBook);

export default bookRoutes;
