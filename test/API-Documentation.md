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

## Merchants Module

### 1. Register Merchant
  - Endpoint: `/merchants/register`
  - Method: `POST`
  - Description: Registers a new merchant.
  - Request Body:
  ```bash
  {
    "name": "Test Merchant",
    "phoneNumber": "123456789",
    "category": "Food",
    "description": "A test merchant for food delivery",
    "openingTime": "08:00",
    "closingTime": "20:00",
    "email": "merchant111@test.com",
    "password": "password123",
    "latitude": 13.7563,
    "longitude": 100.5018
}

  ```

  - Response:
    - `201` Created: Merchant successfully registered.
    - `400` Bad Request: Validation error.

  ### 2. Get Merchant by ID

  - Endpoint: `/merchants/:id`
  - Method: `GET`
  - Description: Retrieves details of a merchant by ID.
  - Response:
    - `200` OK: Merchant details returned.
    - `404` Not Found: Merchant not found.

  ### 3. Update Merchant
  - Endpoint: `/merchants/:id`
  - Method: `PUT`
  - Description: Updates merchant details.
  - Request Body:
  ```bash
  {
    "name": "string1",
    "emaiil": "email@fmail.com",
    "password": "password123",
    "category": "string description",
    "description": "string",
    "openingTime": "08:00",
    "closingTime": "22:00",
    "phoneNumber": "8689687678",
    "latitude": "44.44",
    "longitude": "33.33"
  }
  ```
  - Response:
    - `200 OK`: Merchant successfully updated.
    ```bash
    {
      "id": 1,
      "name": "string1",
      "email": "merchant111@test.com",
      "password": "$2a$10$LaNBCOES/C2AxYOm/JABLeLjYRJWBEa.2VXX74WknZG/FYzrJpWDS",
      "latitude": 13.7563,
      "longitude": 100.5018,
      "category": "string description",
      "description": "string",
      "openingTime": "08:00",
      "closingTime": "22:00",
      "phoneNumber": "8689687678",
      "isVerified": false,
      "createdAt": "2024-12-26T09:49:38.299Z",
      "updatedAt": "2025-01-01T10:38:22.826Z"
    }
    ```
    - `400 Bad Request`: Validation error.

  ### 4. Delete Merchant
  - Endpoint: `/merchants/:id`
  - Method: `DELETE`
  - Description: Deletes a merchant by ID.
  - Response:
    - `200 OK`: Merchant successfully deleted.
    - `404 Not Found`: Merchant not found.

  ### 5. Verify Merchant
  - Endpoint: `/merchants/:id/verify`
  - Method: `PUT`
  - Description: Verifies a merchant.
  - Response:
    - `200 OK`: Merchant verified.
    ```bash
    {
      "id": 1,
      "name": "string1",
      "email": "merchant111@test.com",
      "password": "password123",
      "latitude": 44.44,
      "longitude": 33.33,
      "category": "string description",
      "description": "string",
      "openingTime": "08:00",
      "closingTime": "22:00",
      "phoneNumber": "8689687678",
      "isVerified": true,  <-------------------> false to true
      "createdAt": "2024-12-26T09:49:38.299Z",
      "updatedAt": "2025-01-02T10:20:17.731Z"
    }
    ```
    - `404 Not Found`: Merchant not found.

# Products Module

## 1. Add Product

- Endpoint: `/products`
- Method: `POST`
- Description: Adds a new product.
- Request Body:
  ```bash
  {
    "name": "Test Product",
    "description": "This is a test product.",
    "price": 111,
    "category": "Electronics",
    "merchantId": 1
  }
  ```
- Response:
  - `201 Created`: Product successfully added.
  - `400 Bad Request`: Validation error.

## 2. Get Product by ID

- Endpoint: `/products/:id`
- Method: `GET`
- Description: Retrieves details of a product by ID.
- Response:
  - `200 OK`: Product details returned.
  - `404 Not Found`: Product not found.

## 3. Update Product

- Endpoint: `/products/:id`
- Method: `PUT`
- Description: Updates product details.
- Request Body:
  ```bash
  {
    "name": "string",
    "price": "number",
    "description": "string"
  }
  ```
- Response:
  - `200 OK`: Product successfully updated.
  - `400 Bad Request`: Validation error.

## 4. Delete Product
- Endpoint: /products/:id
- Method: DELETE
- Description: Deletes a product by ID.
- Response:
  - 200 OK: Product successfully deleted.
  - 404 Not Found: Product not found.

## 5. Upload Product Image

- Endpoint: `/products/:id/upload`
- Method: `POST`
- Description: Uploads an image for a product.
- Request Body: Multipart form-data with file field.
- Response:
  - `200 OK`: Image successfully uploaded.
  - `400 Bad Request`: Validation error.