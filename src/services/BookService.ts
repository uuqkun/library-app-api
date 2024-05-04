import { Db, MongoClient } from "mongodb";
import { BookRepository } from "../repositories/BookRepository";
import Book from "../entities/Book";
import { ResponseError } from "../error/ResponseError";
import { validate } from "../entities/validators/validation";
import {
  getBookByISBNValidation,
  insertBookValidation,
  updateBookValidation,
} from "../entities/validators/bookValidation";

export class BookService implements BookRepository {
  private client: MongoClient;
  private db: Db;
  private readonly collectionName: string = "books";

  constructor(mongoURI: string) {
    this.client = new MongoClient(mongoURI);
    this.db = this.client.db();
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.close();
  }

  async getAllBooks(): Promise<Book[]> {
    const collection = this.db.collection(this.collectionName);
    const document = await collection.find().toArray();

    return document.map((Book: Book) => {
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

  async getBookByISBN(reqISBN: string): Promise<Book> {
    const { ISBN } = await validate(getBookByISBNValidation, { ISBN: reqISBN });

    const collection = this.db.collection(this.collectionName);

    const Book = await collection.findOne({
      ISBN: ISBN,
    });

    if (!Book) throw new ResponseError(404, "Book not found");

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

  async insertBook(body: Book): Promise<void> {
    const { ISBN, ...bookData } = validate(insertBookValidation, body);

    const collection = this.db.collection(this.collectionName);

    // CHECK IF BOOK ALREADY REGISTERED
    const isBookExist = await collection.findOne({
      ISBN: ISBN,
    });

    if (isBookExist) throw new ResponseError(409, "Book already registered");

    bookData.ISBN = ISBN;

    // INSERT Book TO DB
    await collection.insertOne(bookData);
  }

  async updateBook(reqISBN: string, body: any): Promise<void> {
    const {
      ISBN,
      Title,
      Author,
      Category,
      PublishYear,
      Publisher,
      AvailableCopies,
    } = validate(updateBookValidation, { ISBN: reqISBN, ...body });
    const collection = this.db.collection(this.collectionName);

    // CHECK IF Book EXIST
    const book = await collection.findOne({
      ISBN: ISBN,
    });

    if (!book) throw new ResponseError(404, "Book not found");

    // SEND UPDATED DATA
    await collection.updateOne(
      { ISBN: ISBN },
      {
        $set: {
          ISBN: ISBN || book.ISBN,
          Title: Title || book.Title,
          Author: Author || book.Author,
          Category: Category || book.Category,
          PublishYear: PublishYear || book.PublishYear,
          Publisher: Publisher || book.Publisher,
          AvailableCopies: AvailableCopies || book.AvailableCopies,
        },
      }
    );
  }

  async deleteBook(reqISBN: string): Promise<void> {
    const { ISBN } = await validate(getBookByISBNValidation, { ISBN: reqISBN });
    const collection = this.db.collection(this.collectionName);

    const Book = await collection.findOne({
      ISBN: ISBN,
    });

    if (!Book) throw new ResponseError(404, "Book not found");

    await collection.deleteOne({ ISBN: ISBN });
  }
}
