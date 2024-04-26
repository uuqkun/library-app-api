import { Db, MongoClient } from "mongodb";
import { BookRepository } from "../../interfaces/repositories/BookRepository";
import Book from "../../entities/Book";
import { ResponseError } from "../../error/ResponseError";

export class MongoDBBookRepository implements BookRepository {
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
    const collection = this.db.collection(this.collectionName);

    const Book = await collection.findOne({
      ISBN: reqISBN,
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
    const collection = this.db.collection(this.collectionName);

    const isBookExist = await collection.findOne({
      ISBN: body.ISBN,
    });

    // CHECK IF BOOK ALREADY REGISTERED
    if (isBookExist) throw new ResponseError(409, "Book already registered");

    // INSERT Book TO DB
    await collection.insertOne(body);
  }

  async updateBook(ISBN: string, body: any): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    const isBookExist = await collection.findOne({
      ISBN: ISBN,
    });

    // CHECK IF Book EXIST
    if (!isBookExist) throw new ResponseError(404, "Book not found");

    // VALIDATE DATA
    const validatedData = body;

    // SEND UPDATED DATA
    await collection.updateOne(
      { ISBN: ISBN },
      {
        $set: {
          ISBN: validatedData.ISBN || isBookExist.ISBN,
          Title: validatedData.Title || isBookExist.Title,
          Author: validatedData.Author || isBookExist.Author,
          Category: validatedData.Category || isBookExist.Category,
          PublishYear: validatedData.PublishYear || isBookExist.PublishYear,
          Publisher: validatedData.Publisher || isBookExist.Publisher,
          AvailableCopies:
            validatedData.AvailableCopies || isBookExist.AvailableCopies,
        },
      }
    );
  }

  async deleteBook(ISBN: string): Promise<void> {
    const collection = this.db.collection(this.collectionName);

    const Book = await collection.findOne({
      ISBN: ISBN,
    });

    if (!Book) throw new ResponseError(404, "Book not found");

    await collection.deleteOne({ ISBN: ISBN });
  }
}
