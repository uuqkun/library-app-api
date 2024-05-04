import Book from "../../entities/Book";
import { BookRepository } from "../../repositories/BookRepository";

export default class GetAllBooks {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }
}