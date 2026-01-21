---
sidebar_position: 1
---

# Authentication

The API uses JWT (JSON Web Tokens) for authentication.

## Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "student"
  }
}
```

## Using the Token

Include the token in the `Authorization` header:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.school.com/api/user
```

## Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

## Refresh Token

**Endpoint:** `POST /api/auth/refresh`

(Add more endpoints as needed)
