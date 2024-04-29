"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(ISBN) {
        return this.bookRepository.deleteBook(ISBN);
    }
}
exports.default = DeleteBook;
//# sourceMappingURL=DeleteBook.js.map