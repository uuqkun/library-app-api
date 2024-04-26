"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBBookRepository = void 0;
const mongodb_1 = require("mongodb");
const ResponseError_1 = require("../../error/ResponseError");
class MongoDBBookRepository {
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
        const collection = this.db.collection(this.collectionName);
        const Book = await collection.findOne({
            ISBN: reqISBN,
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
        const collection = this.db.collection(this.collectionName);
        const isBookExist = await collection.findOne({
            ISBN: body.ISBN,
        });
        // CHECK IF BOOK ALREADY REGISTERED
        if (isBookExist)
            throw new ResponseError_1.ResponseError(409, "Book already registered");
        // INSERT Book TO DB
        await collection.insertOne(body);
    }
    async updateBook(ISBN, body) {
        const collection = this.db.collection(this.collectionName);
        const isBookExist = await collection.findOne({
            ISBN: ISBN,
        });
        // CHECK IF Book EXIST
        if (!isBookExist)
            throw new ResponseError_1.ResponseError(404, "Book not found");
        // VALIDATE DATA
        const validatedData = body;
        // SEND UPDATED DATA
        await collection.updateOne({ ISBN: ISBN }, {
            $set: {
                Name: validatedData.Name || isBookExist.Name,
                Email: validatedData.Email || isBookExist.Email,
                Phone: validatedData.Phone || isBookExist.Phone,
                Address: validatedData.Address || isBookExist.Address,
            },
        });
    }
    async deleteBook(ISBN) {
        const collection = this.db.collection(this.collectionName);
        const Book = await collection.findOne({
            ISBN: ISBN,
        });
        if (!Book)
            throw new ResponseError_1.ResponseError(404, "Book not found");
        await collection.deleteOne({ ISBN: ISBN });
    }
}
exports.MongoDBBookRepository = MongoDBBookRepository;
//# sourceMappingURL=MongoDBBookRepository.js.map