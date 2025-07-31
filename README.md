# C³  Server

Backend server for the **C³ project** – built with **Node.js**, **Express.js**, and **MongoDB**.

## Features

- User roles (admin, traveler, requester)
- Login with JWT token authentication
- Protected profile route
- MongoDB database integration
- RESTful API

## Setup Instructions

1. Clone the repository:
 ```
   git clone https://github.com/ZM-Hamad/C-3-server.git
   cd C-3-server
```

2. Install dependencies:
```
npm install

```

3. Create a `.env` file:

JWT_SECRET=yourSecretKey ,
MONGO_URI=yourMongoDBConnection

4. Start the server:
```npm run dev```


## API Endpoints

| Method | Endpoint                 | Description           |
|--------|--------------------------|-----------------------|
| POST   | /api/users/login         | Login user            |
| GET    | /api/users/profile       | Get profile (protected) |



Technologies Used
Node.js

~ Express.js

~ MongoDB & Mongoose

~ JSON Web Tokens (JWT)

~ Postman (for API testing)

## Author

Hamad ✌️
Yousef ✌️





LAST