# Reservations API Spec

## Get All Reservations

### Endpoint

`GET /api/reservations`

### Response

**200 OK**

```json
{
  "data": [
    {
      "ReservationID": "R001",
      "MemberID": "M001",
      "ISBN": "978-1-60309-058-2",
      "ReservationDate": "2021-01-05",
      "Status": "Fulfilled"
    },
    {
      "ReservationID": "R002",
      "MemberID": "M002",
      "ISBN": "978-1-60309-059-9",
      "ReservationDate": "2021-02-05",
      "Status": "Active"
    }
    ...
  ]
}
```

## Get Single Reservation

### Endpoint

`GET /api/reservations/:reservationID`

### Response

**200 OK**

```json
{
  "data": {
    "ReservationID": "R001",
    "MemberID": "M001",
    "ISBN": "978-1-60309-058-2",
    "ReservationDate": "2021-01-05",
    "Status": "Fulfilled"
  }
}
```

## Create Reservation

### Endpoint

`POST /api/reservations`

### Request Body

```json
{
  "MemberID": "M003",
  "ISBN": "978-1-60309-060-5",
  "ReservationDate": "2021-03-05",
  "Status": "Cancelled"
}
```

### Responses

**200 OK**

```json
{
  "message": "Reservation created successfully.",
  "data": {
    "ReservationID": "R003",
    "MemberID": "M003",
    "ISBN": "978-1-60309-060-5",
    "ReservationDate": "2021-03-05",
    "Status": "Cancelled"
  }
}
```
