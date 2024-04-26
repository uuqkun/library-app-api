# Books API Specs

## CREATE Book

Endpoint: POST /api/books

**Request Body**

```json
{
  "ISBN": "978-1-60309-057-5",
  "Title": "Johnny Buku",
  "Author": "Rob Harrell",
  "Category": "Fiksi",
  "PublishYear": 2020,
  "Publisher": "Top Shelf Productions",
  "AvailableCopies": 3
}
```

**Response Body**

Created `201`

```json
{
  "message": "Book added successfully.",
  "data": {
    "ISBN": "978-1-60309-057-5",
    "Title": "Johnny Buku",
    "Author": "Rob Harrell",
    "Category": "Fiksi",
    "PublishYear": 2020,
    "Publisher": "Top Shelf Productions",
    "AvailableCopies": 3
  }
}
```

Conflict `409`

```json
{
  "message": "Book data has already registered"
}
```

## GET Books

Endpoint: GET /api/books

**Response Body**

OK `200`

```json
{
  "data": [
    {
      "ISBN": "978-1-60309-057-5",
      "Title": "Johnny Buku",
      "Author": "Rob Harrell",
      "Category": "Fiksi",
      "PublishYear": 2020,
      "Publisher": "Top Shelf Productions",
      "AvailableCopies": 3
    },
    {
      "ISBN": "978-1-60309-057-6",
      "Title": "Johnny Buku 2",
      "Author": "Rob Harrell",
      "Category": "Fiksi",
      "PublishYear": 2020,
      "Publisher": "Top Shelf Productions",
      "AvailableCopies": 3
    }
  ]
}
```

## GET Book

Endpoint: GET /api/books/:ISBN

**Response Body**

OK `200`

```json
{
  "ISBN": "978-1-60309-057-5",
  "Title": "Johnny Buku",
  "Author": "Rob Harrell",
  "Category": "Fiksi",
  "PublishYear": 2020,
  "Publisher": "Top Shelf Productions",
  "AvailableCopies": 3
}
```

Not Found `404`

```json
{
  "message": "Book not found."
}
```

## UPDATE Book

Endpoint: PUT /api/books/:ISBN

**Request Body**

```json
{
  "ISBN": "978-1-60309-057-5",
  "Title": "Johnny Buku",
  "Author": "Rob Harrell",
  "Category": "Fiksi",
  "PublishYear": 2020,
  "Publisher": "Top Shelf Productions",
  "AvailableCopies": 3
}
```

**Response Body**

created `201`

```json
{
  "message": "Data updated successfully.",
  "data": {
    "ISBN": "978-1-60309-057-5",
    "Title": "Johnny Buku",
    "Author": "Rob Harrell",
    "Category": "Fiksi",
    "PublishYear": 2020,
    "Publisher": "Top Shelf Productions",
    "AvailableCopies": 3
  }
}
```

## DELETE Book

Endpoint: `DELETE` /api/books/:ISBN

**Response Body**

OK `200`

```json
{
  "message": "Book deleted."
}
```

Not Found `404`

```json
{
  "message": "Book not found."
}
```
