https://readme.so/editor

# API Guide for Your Project

This guide provides an overview of the API endpoints available in your project, organized by module for ease of use. Each section includes the purpose of the endpoint, request method, path, and any relevant input/output details.

## Users Module

### 1. User Registration

- Endpoint: `/users/register`
- Method: `POST`
- Description: Registers a new user.
- Request Body:
```
{
  "name": "user4",
  "email": "user4@test.com",
  "password": "password123",
  "phoneNumber": "1234567890"
}
```

- Response:
    - `201 Created`: User successfully registered.

    ```bash
  {
    "id": 1,
    "name": "user",
    "email": "user@test.com",
    "password": "$2a$10$YJ1dzs4B/rljlFVC3lW0/uD5OL0PQThf7MDDsZTniL.OcgmLWIwv2",
    "phoneNumber": "1234567890",
    "role": "USER",
    "isActive": true,
    "status": "ACTIVE",
    "verificationToken": null,
    "createdAt": "2024-12-28T11:54:11.766Z",
    "updatedAt": "2024-12-28T11:54:11.766Z",
    "lastLogin": null
  }
    ```
    - 400 Bad Request: Validation error.

    ```bash
    {
    "message": "This email is already registered.",
    "error": "Bad Request",
    "statusCode": 400
    }
    ```

### 2 User Login
- Endpoint: `/users/login`
- Method: `POST`
- Description: Logs in a user and returns a JWT token.
- Request Body:

```bash
{
  "email": "user@test.com",
  "password": "password123"
}
```
- Response:
  - 200 OK: JWT token returned.

  ```bash
  {
    "result": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM1Mzg3MjE1LCJleHAiOjE3MzU0NzM2MTV9.8Ks3OYDIwPtBka1jO14aIAE_4AIjV-joJLEYY8QaN_8",
        "user": {
            "id": 1,
            "name": "user",
            "email": "user@test.com",
            "phoneNumber": "1234567890",
            "role": "USER",
            "createdAt": "2024-12-28T11:49:18.446Z",
            "updatedAt": "2024-12-28T12:00:15.252Z",
            "lastLogin": "2024-12-28T12:00:15.252Z"
          }
      }
  }
  ```
  - 401 Unauthorized: Invalid credentials.

  ```bash
  {
    "message": "Email or password is incorrect",
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

  ### 3. Change Password
  - Endpoint: `/users/changepassword`
  - Method: `POST`
  - Description: Allows a user to change their password.
  - Headers:
  ```bash
  Authorization: Bearer your_jwt_token
  Content-Type: application/json

  ```
  - Request Body:
  ```bash
  {
  "currentPassword": "password1234",
  "newPassword": "password123"
  }
  ```
  - Response:
    - 200 OK: Password successfully changed.
    ```bash
    Password updated successfully
    ```
    - 400 Bad Request: Validation error.
    ```bash
    {
    "message": "Unauthorized",
    "statusCode": 401
    }
    ```