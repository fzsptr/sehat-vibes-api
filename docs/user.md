# User API Spec

## Register User
Endpoint: POST /auth/register

Request Body: 
```json
{
    "username": "fzsptr",
    "name": "fauzi",
    "password": "rahasia",
    "weight": 58.5
}
```
Response Body 200 (OK) :
```json
{   
    "status": "success",
    "message": "Register successfully",
    "data": {
        "id": 1,
        "username": "fzsptr",
        "name": "fauzi",
        "weight": 58.2,
        "role": "USER",
        "createdAt": "2025-12-13T10:00:00.000Z"
    }
}
```

Response Body 400 (Bad Request):
```json
{
    "status": "error"
    "message": "username must not blank"
}
```

## Login User
Endpoint: POST /auth/login

Request Body:
```json
{
    "username": "fzsptr",
    "password": "rahasia"
}
```

Response Body 200 (OK) :
```json
{   
    "status": "success",
    "message": "Login succesfully",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "token_type": "Bearer",
        "expires_in": "1d",
        "user": {
            "id": 1,
            "username": "fzsptr",
            "name": "fauzi",
            "role": "USER"
        }
    }
}
```

Response Body 400 (Bad Request):
```json
{   
    "status": "error",
    "message": "username or password wrong"
}
```

Response Body 401 (Unauthorzied):
```json
{   
    "status": "error",
    "message": "Invalid name or password"
}
```

## Get User

Endpoint: GET /users/current

Request Header:
- Authorization: Bearer <JWT_TOKEN>

Response Body 200 (OK) :
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "name": "fauzi",
        "height": 170.5,
        "weight": 55.2,
        "role": "USER",
        "createdAt": "2025-12-13T10:00:00.000Z",
        "updatedAt": "2025-12-13T11:30:00.000Z"
    }
}
```

Response Body 401 (Unauthorzied):
```json
{   
    "status": "error",
    "message": "Unauthorized"
}
```

## Update User
Endpoint: PATCH /users/current

Request Header:
- Authorization: Bearer <JWT_TOKEN>

Request Body :
```json
    "name": "fauzi",
    "weight": "60"
```

Response Body 200 (OK) :
```json
{
    "status": "success",
    "message": "User updated successfully",
    "data": {
        "id": 1,
        "name": "fauzi",
        "height": 170.5,
        "weight": 55.2,
        "role": "USER",
        "updatedAt": "2025-12-13T11:30:00.000Z"
    }
}
```

Response Body 400 (Bad Request):
```json
{   
    "status": "error",
    "message": "Invalid weight"
}
```

Response Body 401 (Unauthorzied):
```json
{   
    "status": "error",
    "message": "Unauthorized"
}
```

## Delete User

Endpoint: DELETE /users/:id

Request Header:
- Authorization: Bearer <JWT_TOKEN>

Response Body 200 (OK)
```json
{
    "status": "success",
    "message": "User deleted successfully"
}
```

Response Body 403 (Forbidden)
```json
{
    "status": "error",
    "message": "Forbidden: Admin access required"
}
```

Response Body 404 (Not Found)
```json
{
    "status": "error",
    "message": "User not found"
}
```