# Postman Test Order

This guide shows the recommended request order for both Postman collections.

## Before You Start

1. Start MongoDB.
2. Start all services:
   - `api-gateway`
   - `movie-service`
   - `cinema-service`
   - `booking-service`
   - `user-service`
3. Seed the admin account:

```bash
cd user-service
npm run seed:admin
```

Default admin credentials:

- `email`: `admin@cinebook.lk`
- `password`: `Admin@123`

## Gateway Collection

Use:

- `postman/CineBook-Gateway.postman_collection.json`
- `postman/CineBook-Gateway.postman_environment.json`

Recommended order:

1. `Gateway Health`
2. `Login Admin`
3. `Get All Users`
4. `Register Normal User`
5. `Login Normal User`
6. `Create Movie`
7. `Get Movie By ID`
8. `Create Cinema`
9. `Create Showtime`
10. `Get All Movies`
11. `Get All Cinemas`
12. `Get All Shows`
13. `Get Own Profile`
14. `Update Own Profile`
15. `Create Booking`
16. `Get My Bookings`
17. `Cancel My Booking`
18. `Delete Movie`

Notes:

- `Login Admin` stores `adminToken`
- `Register Normal User` or `Login Normal User` stores `userToken` and `userId`
- `Create Movie` stores `movieId`
- `Create Cinema` stores `cinemaId`
- `Create Showtime` stores `showId`
- `Create Booking` stores `bookingId`

## Direct Services Collection

Use:

- `postman/CineBook-Direct-Services.postman_collection.json`
- `postman/CineBook-Direct-Services.postman_environment.json`

Recommended order:

### User Service

1. `Login Admin`
2. `Get All Users`
3. `Register Normal User`
4. `Login Normal User`
5. `Get Own Profile`
6. `Update Own Profile`

### Movie Service

1. `Create Movie`
2. `Get All Movies`
3. `Get Movie By ID`

### Cinema Service

1. `Create Cinema`
2. `Get All Cinemas`
3. `Create Showtime`
4. `Get All Shows`

### Booking Service

1. `Create Booking`
2. `Get My Bookings`
3. `Cancel My Booking`

### Optional Cleanup

1. `Delete Movie`

## Common Troubleshooting

### 401 Unauthorized

Check:

- you ran login first
- the token is saved in the environment
- the request uses `Bearer {{adminToken}}` or `Bearer {{userToken}}`

### 403 Forbidden

Check:

- you are using the correct token type
- admin-only routes use `adminToken`
- normal users are only accessing their own profile and bookings

### 404 Not Found

Check:

- `movieId`, `cinemaId`, `showId`, or `bookingId` was saved from earlier requests
- the dependent create request actually succeeded

### 502 From Gateway

Check:

- the target service is running on the expected port
- the gateway is running on port `3000`

