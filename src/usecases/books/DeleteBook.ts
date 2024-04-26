import { BookRepository } from "../../interfaces/repositories/BookRepository";

export default class DeleteBook { 
    constructor(private readonly bookRepository:BookRepository) {}

    async execute(ISBN: string): Promise<void> { 
        return this.bookRepository.deleteBook(ISBN);
    }
}