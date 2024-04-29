"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllBooks {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute() {
        return this.bookRepository.getAllBooks();
    }
}
exports.default = GetAllBooks;
//# sourceMappingURL=GetAllBooks.js.map