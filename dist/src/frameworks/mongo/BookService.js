"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const mongodb_1 = require("mongodb");
const ResponseError_1 = require("../../error/ResponseError");
const validation_1 = require("../../entities/validators/validation");
const bookValidation_1 = require("../../entities/validators/bookValidation");
class BookService {
    constructor(mongoURI) {
        this.collectionName = "books";
        this.client = new mongodb_1.MongoClient(mongoURI);
        this.db = this.client.db();
    }
    async connect() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.close();
    }
    async getAllBooks() {
        const collection = this.db.collection(this.collectionName);
        const document = await collection.find().toArray();
        return document.map((Book) => {
            return {
                _id: Book._id,
                ISBN: Book.ISBN,
                Title: Book.Title,
                Author: Book.Author,
                Category: Book.Category,
                PublishYear: Book.PublishYear,
                Publisher: Book.Publisher,
                AvailableCopies: Book.AvailableCopies,
            };
        });
    }
    async getBookByISBN(reqISBN) {
        const { ISBN } = await (0, validation_1.validate)(bookValidation_1.getBookByISBNValidation, { ISBN: reqISBN });
        const collection = this.db.collection(this.collectionName);
        const Book = await collection.findOne({
            ISBN: ISBN,
        });
        if (!Book)
            throw new ResponseError_1.ResponseError(404, "Book not found");
        return {
            _id: Book._id,
            ISBN: Book.ISBN,
            Title: Book.Title,
            Author: Book.Author,
            Category: Book.Category,
            PublishYear: Book.PublishYear,
            Publisher: Book.Publisher,
            AvailableCopies: Book.AvailableCopies,
        };
    }
    async insertBook(body) {
        const { ISBN, ...bookData } = (0, validation_1.validate)(bookValidation_1.insertBookValidation, body);
        const collection = this.db.collection(this.collectionName);
        // CHECK IF BOOK ALREADY REGISTERED
        const isBookExist = await collection.findOne({
            ISBN: ISBN,
        });
        if (isBookExist)
            throw new ResponseError_1.ResponseError(409, "Book already registered");
        bookData.ISBN = ISBN;
        // INSERT Book TO DB
        await collection.insertOne(bookData);
    }
    async updateBook(reqISBN, body) {
        const { ISBN, Title, Author, Category, PublishYear, Publisher, AvailableCopies, } = (0, validation_1.validate)(bookValidation_1.updateBookValidation, { ISBN: reqISBN, ...body });
        const collection = this.db.collection(this.collectionName);
        // CHECK IF Book EXIST
        const book = await collection.findOne({
            ISBN: ISBN,
        });
        if (!book)
            throw new ResponseError_1.ResponseError(404, "Book not found");
        // SEND UPDATED DATA
        await collection.updateOne({ ISBN: ISBN }, {
            $set: {
                ISBN: ISBN || book.ISBN,
                Title: Title || book.Title,
                Author: Author || book.Author,
                Category: Category || book.Category,
                PublishYear: PublishYear || book.PublishYear,
                Publisher: Publisher || book.Publisher,
                AvailableCopies: AvailableCopies || book.AvailableCopies,
            },
        });
    }
    async deleteBook(reqISBN) {
        const { ISBN } = await (0, validation_1.validate)(bookValidation_1.getBookByISBNValidation, { ISBN: reqISBN });
        const collection = this.db.collection(this.collectionName);
        const Book = await collection.findOne({
            ISBN: ISBN,
        });
        if (!Book)
            throw new ResponseError_1.ResponseError(404, "Book not found");
        await collection.deleteOne({ ISBN: ISBN });
    }
}
exports.BookService = BookService;
//# sourceMappingURL=BookService.js.map