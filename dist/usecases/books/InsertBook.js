"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InsertBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(book) {
        return this.bookRepository.insertBook(book);
    }
}
exports.default = InsertBook;
//# sourceMappingURL=InsertBook.js.map