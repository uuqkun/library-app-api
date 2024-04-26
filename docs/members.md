# Members API Spec

## CREATE Member

Endpoint: POST /api/auth/register

**Request Body**

```json
{
  "Name": "Test name",
  "Address": "Test address",
  "Email": "Test email",
  "Phone": "08080808"
}
```

**Response Body**

Created `201`

```json
{
  "message": "Member created successfully.",
  "data": {
    "Name": "Test name",
    "Address": "Test address",
    "Email": "Test email",
    "Phone": "0808080"
  }
}
```

Conflict `409`

```json
{
  "message": "Cannot use credentials"
}
```

## GET All Member

Endpoint: GET /api/members

**Response Body**

OK `200`

```json
{
  "data": [
    {
      "Name": "Test name",
      "Address": "Test address",
      "Email": "test@gmail.com",
      "Phone": "08080808"
    },
    {
      "Name": "Test name",
      "Address": "Test address",
      "Email": "test@gmail.com",
      "Phone": "08080808"
    }
    ...
  ]
}
```

## GET Single Member

Endpoint: GET /api/members/:memberID

**Response Body**

OK `200`

```json
{
  "Name": "Test name",
  "Address": "Test address",
  "Email": "test@gmail.com",
  "Phone": "0808080"
}
```

Not Found `404`

```json
{
  "message": "Member not found."
}
```

## UPDATE Member

Endpoint: PUT /api/members/:memberID

**Request Body**

```json
{
  "Name": "Test name",
  "Address": "Test address",
  "Email": "Test email",
  "Phone": "08080808"
}
```

**Response Body**

Member created `201`

```json
{
  "message": "Data updated successfully.",
  "data": {
    "Name": "Test name",
    "Address": "Test address",
    "Email": "Test email",
    "Phone": "0808080"
  }
}
```

## DELETE Member

Endpoint: `DELETE` /api/members/:memberID

**Response Body**

OK `200`

```json
{
  "message": "Member deleted."
}
```

Not Found `404`

```json
{
  "message": "Member not found."
}
```
