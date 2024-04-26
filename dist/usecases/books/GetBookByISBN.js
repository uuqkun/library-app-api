"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetBookByISBN {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(ISBN) {
        return this.bookRepository.getBookByISBN(ISBN);
    }
}
exports.default = GetBookByISBN;
//# sourceMappingURL=GetBookByISBN.js.map