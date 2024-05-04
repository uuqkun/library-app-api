import Book from "../../entities/Book";
import { BookRepository } from "../../repositories/BookRepository";

export default class GetBookByISBN {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(ISBN: string): Promise<Book> {
    return this.bookRepository.getBookByISBN(ISBN);
  }
}
