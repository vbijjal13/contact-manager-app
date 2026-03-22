# Contact Management API Documentation

## Base URL
All API endpoints are relative to your application's base URL (e.g., `http://localhost:3000`).

---

## Endpoints

### 1. GET /api/contacts
**Retrieve all contacts for a specific user**

#### Query Parameters
- `userId` (string, required) - The ID of the user

#### Request Example
```bash
GET /api/contacts?userId=1
```

#### Response (Success - 200)
```json
{
  "success": true,
  "contacts": [
    {
      "id": "c1",
      "userId": "1",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com",
      "phoneNumber": "9876543210",
      "countryCode": "+1",
      "createdAt": "2024-03-20T10:00:00Z"
    },
    {
      "id": "c2",
      "userId": "1",
      "firstName": "Bob",
      "lastName": "Brown",
      "email": "bob.brown@example.com",
      "phoneNumber": "9876543211",
      "countryCode": "+1",
      "createdAt": "2024-03-20T10:05:00Z"
    }
  ]
}
```

#### Response (Error - 400)
```json
{
  "error": "userId query parameter is required"
}
```

---

### 2. POST /api/contacts
**Add a new contact for a user**

#### Request Body
```json
{
  "userId": "1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "9876543212",
  "countryCode": "+1"
}
```

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "Contact added successfully",
  "contact": {
    "id": "c3",
    "userId": "1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "9876543212",
    "countryCode": "+1",
    "createdAt": "2024-03-22T14:30:00Z"
  }
}
```

#### Response (Error - 400)
```json
{
  "error": "Missing required fields: userId, firstName, lastName, email, phoneNumber, countryCode"
}
```

#### Response (Error - 400 - Invalid Email)
```json
{
  "error": "Invalid email format"
}
```

---

### 3. PUT /api/contacts/[id]
**Update an existing contact**

#### URL Parameters
- `id` (string) - The contact ID

#### Request Body
```json
{
  "userId": "1",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phoneNumber": "9876543213",
  "countryCode": "+1"
}
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "contact": {
    "id": "c1",
    "userId": "1",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "9876543213",
    "countryCode": "+1",
    "createdAt": "2024-03-20T10:00:00Z",
    "updatedAt": "2024-03-22T14:35:00Z"
  }
}
```

#### Response (Error - 404)
```json
{
  "error": "Contact not found"
}
```

#### Response (Error - 403)
```json
{
  "error": "Unauthorized: Contact does not belong to this user"
}
```

---

### 4. DELETE /api/contacts/[id]
**Delete a contact**

#### URL Parameters
- `id` (string) - The contact ID

#### Query Parameters
- `userId` (string, required) - The ID of the user

#### Request Example
```bash
DELETE /api/contacts/c1?userId=1
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

#### Response (Error - 400)
```json
{
  "error": "userId query parameter is required"
}
```

#### Response (Error - 404)
```json
{
  "error": "Contact not found"
}
```

#### Response (Error - 403)
```json
{
  "error": "Unauthorized: Contact does not belong to this user"
}
```

---

## Contact Object Schema

```typescript
{
  id: string;                    // Unique contact identifier
  userId: string;                // User who owns this contact
  firstName: string;             // Contact's first name
  lastName: string;              // Contact's last name
  email: string;                 // Contact's email address
  phoneNumber: string;           // Contact's phone number
  countryCode: string;           // Country code (e.g., "+1", "+91", "+44")
  createdAt: string;             // ISO 8601 timestamp of creation
  updatedAt?: string;            // ISO 8601 timestamp of last update (optional)
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (missing/invalid fields)
- `403` - Forbidden (unauthorized access)
- `404` - Not Found
- `500` - Internal Server Error

---

## Security Notes

1. **User Isolation**: All operations enforce `userId` checks to ensure users can only access their own contacts
2. **Email Validation**: Email addresses are validated before being stored
3. **Authorization**: Update and delete operations verify that the contact belongs to the requesting user

---

## Frontend Integration Example

### Using Fetch API

#### Get Contacts
```typescript
const userId = "1";
const response = await fetch(`/api/contacts?userId=${userId}`);
const data = await response.json();
console.log(data.contacts);
```

#### Add Contact
```typescript
const response = await fetch('/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "9876543212",
    countryCode: "+1"
  })
});
const data = await response.json();
console.log(data.contact);
```

#### Update Contact
```typescript
const contactId = "c1";
const response = await fetch(`/api/contacts/${contactId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: "1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phoneNumber: "9876543213",
    countryCode: "+1"
  })
});
const data = await response.json();
console.log(data.contact);
```

#### Delete Contact
```typescript
const contactId = "c1";
const userId = "1";
const response = await fetch(`/api/contacts/${contactId}?userId=${userId}`, {
  method: 'DELETE'
});
const data = await response.json();
```

---

## Notes

- The API uses JSON Server on `localhost:3001` as the backend
- All timestamps are in ISO 8601 format
- Phone numbers are stored as strings without formatting
- Country codes should include the '+' prefix (e.g., "+1", "+91", "+44")
