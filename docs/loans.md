Berikut adalah dokumentasi markdown untuk tabel Loans dan Reservations:

# Loans API Spec

## Get All Loans

### Endpoint

`GET /api/loans`

### Response

**200 OK**

```json
{
  "data": [
    {
      "LoanID": "L001",
      "MemberID": "M001",
      "ISBN": "978-1-60309-057-5",
      "LoanDate": "2021-01-10",
      "DueDate": "2021-01-24",
      "ReturnDate": "2021-01-22",
      "Fines": 0
    },
    {
      "LoanID": "L002",
      "MemberID": "M002",
      "ISBN": "978-1-60309-058-2",
      "LoanDate": "2021-02-10",
      "DueDate": "2021-02-24",
      "ReturnDate": "2021-02-25",
      "Fines": 50
    }
    ...
  ]
}
```

## Get Single Loan

### Endpoint

`GET /api/loans/:loanID`

### Response

**200 OK**

```json
{
  "data": {
    "LoanID": "L001",
    "MemberID": "M001",
    "ISBN": "978-1-60309-057-5",
    "LoanDate": "2021-01-10",
    "DueDate": "2021-01-24",
    "ReturnDate": "2021-01-22",
    "Fines": 0
  }
}
```

## Create Loan

### Endpoint

`POST /api/loans`

### Request Body

```json
{
  "MemberID": "M003",
  "ISBN": "978-1-60309-059-9",
  "LoanDate": "2021-03-10",
  "DueDate": "2021-03-24",
  "ReturnDate": null,
  "Fines": null
}
```

### Responses

**200 OK**

```json
{
  "message": "Loan created successfully.",
  "data": {
    "LoanID": "L003",
    "MemberID": "M003",
    "ISBN": "978-1-60309-059-9",
    "LoanDate": "2021-03-10",
    "DueDate": "2021-03-24",
    "ReturnDate": null,
    "Fines": null
  }
}
```

