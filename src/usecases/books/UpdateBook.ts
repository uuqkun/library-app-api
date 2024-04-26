import { BookRepository } from "../../interfaces/repositories/BookRepository";

export default class UpdateBook {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(ISBN: string, data: any): Promise<void> {
    return this.bookRepository.updateBook(ISBN, data);
  }
}
