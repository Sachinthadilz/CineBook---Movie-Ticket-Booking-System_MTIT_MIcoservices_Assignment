# CineBook - Movie Ticket Booking System

Microservices backend built with Node.js, Express, MongoDB, Mongoose, and Swagger.

## Overview

This repository contains five apps:

- `api-gateway` on port `3000`
- `movie-service` on port `3001`
- `cinema-service` on port `3002`
- `booking-service` on port `3003`
- `user-service` on port `3004`

Each business service has:

- its own Express app
- its own MongoDB database
- its own models, controllers, and routes
- its own Swagger UI at `/api-docs`
- global error handling and 404 handling

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Swagger UI Express
- Swagger JSDoc
- bcryptjs in `user-service`
- http-proxy-middleware in `api-gateway`

## Folder Structure

```text
cinebook-system/
|-- README.md
|-- api-gateway/
|   |-- .env
|   |-- index.js
|   |-- package.json
|   |-- package-lock.json
|   |-- routesDocs.js
|   `-- swagger.js
|-- movie-service/
|   |-- .env
|   |-- index.js
|   |-- package.json
|   |-- package-lock.json
|   |-- swagger.js
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   `-- movieController.js
|   |-- models/
|   |   `-- Movie.js
|   `-- routes/
|       `-- movieRoutes.js
|-- cinema-service/
|   |-- .env
|   |-- index.js
|   |-- package.json
|   |-- package-lock.json
|   |-- swagger.js
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- cinemaController.js
|   |   `-- showtimeController.js
|   |-- models/
|   |   |-- Cinema.js
|   |   `-- Showtime.js
|   `-- routes/
|       |-- cinemaRoutes.js
|       `-- showtimeRoutes.js
|-- booking-service/
|   |-- .env
|   |-- index.js
|   |-- package.json
|   |-- package-lock.json
|   |-- swagger.js
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   `-- bookingController.js
|   |-- models/
|   |   `-- Booking.js
|   `-- routes/
|       `-- bookingRoutes.js
`-- user-service/
    |-- .env
    |-- index.js
    |-- package.json
    |-- package-lock.json
    |-- swagger.js
    |-- config/
    |   `-- db.js
    |-- controllers/
    |   `-- userController.js
    |-- models/
    |   `-- User.js
    `-- routes/
        `-- userRoutes.js
```

## MongoDB Databases

Each service uses its own database:

| Service | Database |
|---|---|
| movie-service | `cinebook_movies` |
| cinema-service | `cinebook_cinemas` |
| booking-service | `cinebook_bookings` |
| user-service | `cinebook_users` |

## Environment Variables

Each service has its own `.env` file.

### `movie-service/.env`

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/cinebook_movies
```

### `cinema-service/.env`

```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/cinebook_cinemas
```

### `booking-service/.env`

```env
PORT=3003
MONGO_URI=mongodb://localhost:27017/cinebook_bookings
```

### `user-service/.env`

```env
PORT=3004
MONGO_URI=mongodb://localhost:27017/cinebook_users
```

### `api-gateway/.env`

```env
PORT=3000
MOVIE_SERVICE_URL=http://localhost:3001
CINEMA_SERVICE_URL=http://localhost:3002
BOOKING_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3004
```

## Install Commands

Run these from the project root in separate commands:

```bash
cd api-gateway && npm install
cd ../movie-service && npm install
cd ../cinema-service && npm install
cd ../booking-service && npm install
cd ../user-service && npm install
```

## How To Run

Make sure MongoDB is running locally on `mongodb://localhost:27017`.

Open five terminals from the root folder.

### Terminal 1

```bash
cd api-gateway
npm run dev
```

### Terminal 2

```bash
cd movie-service
npm run dev
```

### Terminal 3

```bash
cd cinema-service
npm run dev
```

### Terminal 4

```bash
cd booking-service
npm run dev
```

### Terminal 5

```bash
cd user-service
npm run dev
```

## Admin Seed

Create or refresh an admin account from the `user-service` folder:

```bash
npm run seed:admin
```

Default seeded admin credentials:

- `email`: `admin@cinebook.lk`
- `password`: `Admin@123`

Optional overrides:

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_PHONE`

## API URL Table

### Direct Service URLs

| Service | Method | URL |
|---|---|---|
| Movie | POST | `http://localhost:3001/movies` |
| Movie | GET | `http://localhost:3001/movies` |
| Movie | GET | `http://localhost:3001/movies/:id` |
| Movie | DELETE | `http://localhost:3001/movies/:id` |
| Cinema | POST | `http://localhost:3002/cinemas` |
| Cinema | GET | `http://localhost:3002/cinemas` |
| Showtime | POST | `http://localhost:3002/shows` |
| Showtime | GET | `http://localhost:3002/shows` |
| Booking | POST | `http://localhost:3003/bookings` |
| Booking | GET | `http://localhost:3003/bookings` |
| Booking | DELETE | `http://localhost:3003/bookings/:id` |
| User | POST | `http://localhost:3004/users/register` |
| User | POST | `http://localhost:3004/users/login` |
| User | GET | `http://localhost:3004/users` |
| User | GET | `http://localhost:3004/users/:id` |
| User | PUT | `http://localhost:3004/users/:id` |

### Gateway URLs

| Service | Method | URL |
|---|---|---|
| Gateway | GET | `http://localhost:3000/` |
| Movie | POST | `http://localhost:3000/movies` |
| Movie | GET | `http://localhost:3000/movies` |
| Movie | GET | `http://localhost:3000/movies/:id` |
| Movie | DELETE | `http://localhost:3000/movies/:id` |
| Cinema | POST | `http://localhost:3000/cinemas` |
| Cinema | GET | `http://localhost:3000/cinemas` |
| Showtime | POST | `http://localhost:3000/shows` |
| Showtime | GET | `http://localhost:3000/shows` |
| Booking | POST | `http://localhost:3000/bookings` |
| Booking | GET | `http://localhost:3000/bookings` |
| Booking | DELETE | `http://localhost:3000/bookings/:id` |
| User | POST | `http://localhost:3000/users/register` |
| User | POST | `http://localhost:3000/users/login` |
| User | GET | `http://localhost:3000/users` |
| User | GET | `http://localhost:3000/users/:id` |
| User | PUT | `http://localhost:3000/users/:id` |

## Swagger URL Table

| App | Swagger URL |
|---|---|
| API Gateway | `http://localhost:3000/api-docs` |
| Movie Service | `http://localhost:3001/api-docs` |
| Cinema Service | `http://localhost:3002/api-docs` |
| Booking Service | `http://localhost:3003/api-docs` |
| User Service | `http://localhost:3004/api-docs` |

## Authentication

Authentication uses Bearer JWT tokens.

Public routes:

- `POST /users/register`
- `POST /users/login`
- `GET /movies`
- `GET /movies/:id`
- `GET /cinemas`
- `GET /shows`

Protected routes:

- `GET /users/:id`
- `PUT /users/:id`
- `POST /bookings`
- `GET /bookings`
- `DELETE /bookings/:id`
- `POST /movies`
- `DELETE /movies/:id`
- `POST /cinemas`
- `POST /shows`

Admin-only routes:

- `GET /users`
- `POST /movies`
- `DELETE /movies/:id`
- `POST /cinemas`
- `POST /shows`

### Auth Flow

1. Register or log in with `user-service`.
2. Copy the returned `token`.
3. Send it in the header:

```http
Authorization: Bearer <your-jwt-token>
```

### Admin vs User Routes

Admin routes:

- `GET /users`
- `POST /movies`
- `DELETE /movies/:id`
- `POST /cinemas`
- `POST /shows`

Authenticated user routes:

- `GET /users/:id`
- `PUT /users/:id`
- `POST /bookings`
- `GET /bookings`
- `DELETE /bookings/:id`

Public routes:

- `POST /users/register`
- `POST /users/login`
- `GET /movies`
- `GET /movies/:id`
- `GET /cinemas`
- `GET /shows`

Note:

- Newly registered users are created with role `user`.
- Public registration cannot create an `admin` account, even if `role: "admin"` is sent in the request body.
- To create an admin quickly, run `npm run seed:admin` inside `user-service`.

### Swagger Auth

For protected Swagger endpoints:

1. Open `/api-docs`
2. Click `Authorize`
3. Paste:

```text
Bearer <your-jwt-token>
```

## Models

### Movie

- `title`
- `genre`
- `duration`
- `description`
- `language`
- `rating`
- `releaseDate`
- `timestamps: true`

### Cinema

- `cinemaName`
- `location`
- `halls[]`
- `showtimes[]`
- `timestamps: true`

### Booking

- `userId`
- `showId`
- `seats[]`
- `status`
- `movieTitle`
- `cinemaName`
- `showDate`
- `showTime`
- `totalAmount`
- `timestamps: true`

### User

- `name`
- `email`
- `password`
- `phone`
- `role`
- `timestamps: true`

## API Gateway Behavior

The gateway proxies requests as follows:

- `/movies` -> `http://localhost:3001`
- `/cinemas` -> `http://localhost:3002`
- `/shows` -> `http://localhost:3002`
- `/bookings` -> `http://localhost:3003`
- `/users` -> `http://localhost:3004`

The gateway also:

- serves Swagger at `/api-docs`
- returns all routes and Swagger URLs from `GET /`
- returns `502` when a downstream service is unavailable

## Postman-Ready Sample Request Bodies

### 1. Create Movie

```json
{
  "title": "Gehenu Lamai",
  "genre": "Drama",
  "duration": 110,
  "description": "A restored Sri Lankan classic drama screened for a new generation.",
  "language": "Sinhala",
  "rating": "PG",
  "releaseDate": "2026-05-01T00:00:00.000Z"
}
```

### 2. Get All Movies

No request body.

### 3. Get Movie By ID

No request body.

### 4. Delete Movie

No request body.

### 5. Create Cinema

```json
{
  "cinemaName": "Liberty by Scope",
  "location": "Colombo 03",
  "halls": [
    {
      "hallName": "Lotus Hall",
      "totalSeats": 180,
      "seatType": "Recliner"
    },
    {
      "hallName": "Sigiri Hall",
      "totalSeats": 120,
      "seatType": "VIP"
    }
  ]
}
```

### 6. Get All Cinemas

No request body.

### 7. Create Showtime

```json
{
  "movieId": "660123abc123def456789012",
  "movieTitle": "Gehenu Lamai",
  "cinemaId": "660123abc123def456789111",
  "hallName": "Lotus Hall",
  "showDate": "2026-05-10",
  "showTime": "19:15",
  "ticketPrice": 1800,
  "availableSeats": 120
}
```

### 8. Get All Showtimes

No request body.

### 9. Create Booking

```json
{
  "userId": "660123abc123def456789444",
  "showId": "660123abc123def456789222",
  "movieTitle": "Gehenu Lamai",
  "cinemaName": "Liberty by Scope",
  "showDate": "2026-05-10",
  "showTime": "19:15",
  "seats": ["B4", "B5"],
  "totalAmount": 3600
}
```

### 10. Get All Bookings

No request body.

### 11. Cancel Booking

No request body.

### 12. Register User

```json
{
  "name": "Nadeesha Perera",
  "email": "nadeesha.perera@example.com",
  "password": "SecurePass123",
  "phone": "0772345678"
}
```

### 13. Login User

```json
{
  "email": "nadeesha.perera@example.com",
  "password": "SecurePass123"
}
```

Sample success response:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "660123abc123def456789444",
    "name": "Nadeesha Perera",
    "email": "nadeesha.perera@example.com",
    "phone": "0772345678",
    "role": "user",
    "isActive": true
  }
}
```

### 14. Get User By ID

No request body.

### 15. Update User Profile

Normal user updating their own profile:

```json
{
  "name": "Nadeesha Perera",
  "phone": "0719988776"
}
```

Admin updating another user including role:

```json
{
  "name": "Nadeesha Perera",
  "email": "nadeesha.perera@example.com",
  "phone": "0719988776",
  "role": "admin"
}
```

## Recommended Testing Order

1. Register a user.
2. Log in and copy the JWT token.
3. Call `GET /users/:id` with `Authorization: Bearer <token>`.
4. Call `PUT /users/:id` to update the logged-in user's profile.
5. Promote one user to `admin` directly in MongoDB for admin route testing.
6. Log in as that admin and copy the admin token.
7. Create a movie with the admin token.
8. Create a cinema with the admin token.
9. Create a showtime with the admin token using the movie and cinema IDs.
10. Create a booking with the normal user token.
11. Test booking cancellation with the normal user token.
12. Repeat the same flow through `http://localhost:3000` to confirm gateway behavior.

## Notes

- All services use CommonJS with `require` and `module.exports`.
- All controllers use `async/await`.
- All schemas use `timestamps: true`.
- `user-service` hashes passwords with `bcryptjs`.
- Every service has a global error handler and a 404 handler.
- Swagger JSDoc comments are added on every route file, and the gateway also documents all proxied methods.
