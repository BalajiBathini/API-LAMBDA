# AWS Lambda and S3 JSON Storage API

## Overview

This project implements a basic web service that allows users to store and retrieve JSON data using Amazon Web Services (AWS). The service utilizes AWS Lambda for serverless computation and Amazon S3 as the storage solution for JSON files. It provides two API endpoints:

1. **POST /**: Store JSON data in an S3 bucket.
2. **GET /**: Retrieve all stored JSON data from the S3 bucket.

## Table of Contents
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [POST Endpoint](#post-endpoint)
  - [GET Endpoint](#get-endpoint)
- [Testing the API](#testing-the-api)
- [Error Handling](#error-handling)
- [Thought Process](#thought-process)
- [Contributing](#contributing)
- [License](#license)

## Features
- Store JSON data in a public S3 bucket.
- Retrieve all stored JSON data in a consolidated format.
- Simple and clear API endpoints for easy interaction.
- Error handling for invalid inputs and S3 access issues.

## Setup Instructions

1. **Create an S3 Bucket**:
   - Log in to the AWS Management Console.
   - Navigate to S3 and create a new bucket (e.g., `my-json-storage-bucket`).
   - Make sure to set permissions to allow public access for testing (you can adjust this later based on your requirements).

2. **Set Up API Gateway**:
   - Create a new API in the AWS API Gateway.
   - Configure it to trigger your Lambda functions.

3. **Create Lambda Functions**:
   - **Function for POST Endpoint (`storeJsonData`)**:
     - This function will handle storing the incoming JSON data in S3.
   - **Function for GET Endpoint (`getAllJsonData`)**:
     - This function will retrieve all JSON files from S3 and compile their contents.

4. **Deploy the API**:
   - Deploy the API in the API Gateway to make it publicly accessible.

5. **Install AWS SDK** (if needed):
   - Ensure you have the AWS SDK for JavaScript installed in your Lambda functions:
     ```bash
     npm install @aws-sdk/client-s3
     ```

## API Endpoints

### POST Endpoint
- **URL**: `https://<your-api-id>.execute-api.<region>.amazonaws.com/prod`
- **Method**: POST
- **Request Body**:
```json
{
    "name": "John",
    "age": 30
}
```
- **Response**:
```json
{
    "e_tag": "a1b2c3d4e5f6g7h8i9j0",
    "url": "https://my-json-storage-bucket.s3.amazonaws.com/file1.json"
}
```

### GET Endpoint
- **URL**: `https://<your-api-id>.execute-api.<region>.amazonaws.com/prod`
- **Method**: GET
- **Response**:
```json
[
    {"name": "John", "age": 30},
    {"name": "Jane", "age": 25}
]
```

## Testing the API
- Use Postman or a similar tool to test the API endpoints.
- For the POST endpoint, send valid JSON data and check if it returns the expected e_tag and URL.
- For the GET endpoint, verify that it returns all stored JSON objects in an array.

## Error Handling
- The API should handle invalid JSON inputs and respond with appropriate error messages.
- S3 access issues should also be handled, returning a `500` status code with an error message.

## Thought Process
While designing this solution, I aimed to create a simple and effective way to store and retrieve JSON data using AWS services. I chose S3 for its ease of use and scalability, while AWS Lambda allowed for a serverless architecture, reducing management overhead. The use of API Gateway facilitates easy access to the Lambda functions through HTTP requests.

## Contributing
Contributions are welcome! If you would like to improve this project or add new features, please fork the repository and submit a pull request.

---
