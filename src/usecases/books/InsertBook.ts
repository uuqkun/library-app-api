import Book from "../../entities/Book";
import { BookRepository } from "../../repositories/BookRepository";


export default class InsertBook { 
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(book: Book): Promise<void> {
        return this.bookRepository.insertBook(book);
    }
}