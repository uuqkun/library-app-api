"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(ISBN, data) {
        return this.bookRepository.updateBook(ISBN, data);
    }
}
exports.default = UpdateBook;
//# sourceMappingURL=UpdateBook.js.map