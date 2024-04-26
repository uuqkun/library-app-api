import Book from "../../entities/Book";

interface IBookUpdate {
  ISBN: string;
  Title: string;
  Author: string;
  Category: string;
  PublishYear: number;
  Publisher: string;
  AvailableCopies: number;
}

export interface BookRepository {
  getAllBooks(): Promise<Book[]>;
  getBookByISBN(ISBN: string): Promise<Book>;
  insertBook(book: Book): Promise<void>;
  updateBook(ISBN: string, data: IBookUpdate): Promise<void>;
  deleteBook(ISBN: string): Promise<void>;
}
