"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const bookRoutes = express_1.default.Router();
// Book routes
bookRoutes.get("/books", BookController_1.default.getBooks);
bookRoutes.get("/books/:ISBN", BookController_1.default.getBookByISBN);
bookRoutes.post("/books", BookController_1.default.insertBook);
bookRoutes.patch("/books/:ISBN", BookController_1.default.updateBook);
bookRoutes.delete("/books/:ISBN", BookController_1.default.deleteBook);
exports.default = bookRoutes;
//# sourceMappingURL=bookRoutes.js.map