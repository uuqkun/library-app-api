# Library App API Documentation
- Author: Achmad Furqon Rachmadie (Uqie rach)

## Description
Library App API is a backend service built with Express, MongoDB, and TypeScript. It provides endpoints to manage members, loans, books, and reservations in a library system.

## Tech Stacks
- Express
- MongoDB
- TypeScript

## Collections
- **Members**: Collection to manage library members.
- **Loans**: Collection to manage book loans.
- **Books**: Collection to manage library books.
- **Reservations**: Collection to manage book reservations.

## Endpoints
- Members
    - `GET /members`: Retrieve all members.
    - `GET /members/:id`: Retrieve a member by ID.
    - `POST /members`: Create a new member.
    - `PUT /members/:id`: Update an existing member.
    - `DELETE /members/:id`: Delete a member by ID.

- Loans
    - `GET /loans`: Retrieve all loans.
    - `GET /loans/:id`: Retrieve a loan by ID.
    - `POST /loans`: Create a new loan.
    - `PUT /loans/:id`: Update an existing loan.
    - `DELETE /loans/:id`: Delete a loan by ID.

- Books
    - `GET /books: `Retrieve all books.
    - `GET /books/:id`: Retrieve a book by ID.
    - `POST /books`: Create a new book.
    - `PUT /books/:id`: Update an existing book.
    - `DELETE /books/:id`: Delete a book by ID.

- Reservations
    - `GET /reservations`: Retrieve all reservations.
    - `GET /reservations/:id`: Retrieve a reservation by ID.
    - `POST /reservations`: Create a new reservation.
    - `PUT /reservations/:id`: Update an existing reservation.
    - `DELETE /reservations/:id`: Delete a reservation by ID.
