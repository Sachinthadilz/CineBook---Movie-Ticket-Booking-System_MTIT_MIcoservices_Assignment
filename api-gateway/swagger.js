const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineBook API Gateway",
      version: "1.0.0",
      description:
        "API documentation for gateway routes and all proxied CineBook endpoints.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        GatewayStatus: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "CineBook API Gateway is running",
            },
            version: { type: "string", example: "1.0.0" },
            docs: { type: "string", example: "http://localhost:3000/api-docs" },
            routes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  method: { type: "string", example: "POST" },
                  path: { type: "string", example: "/movies" },
                  target: { type: "string", example: "http://localhost:3001" },
                },
              },
            },
            swaggerUrls: {
              type: "object",
              properties: {
                gateway: {
                  type: "string",
                  example: "http://localhost:3000/api-docs",
                },
                movie: {
                  type: "string",
                  example: "http://localhost:3001/api-docs",
                },
                cinema: {
                  type: "string",
                  example: "http://localhost:3002/api-docs",
                },
                booking: {
                  type: "string",
                  example: "http://localhost:3003/api-docs",
                },
                user: {
                  type: "string",
                  example: "http://localhost:3004/api-docs",
                },
              },
            },
          },
        },
        Movie: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789012" },
            title: { type: "string", example: "Gehenu Lamai" },
            genre: {
              type: "string",
              enum: [
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Sci-Fi",
                "Animation",
                "Romance",
                "Thriller",
              ],
              example: "Drama",
            },
            duration: { type: "number", example: 110 },
            description: {
              type: "string",
              example: "A restored Sri Lankan classic drama.",
            },
            language: { type: "string", example: "Sinhala" },
            rating: {
              type: "string",
              enum: ["G", "PG", "PG-13", "R", "U"],
              example: "PG",
            },
            releaseDate: {
              type: "string",
              format: "date-time",
              example: "2026-05-01T00:00:00.000Z",
            },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateMovieRequest: {
          type: "object",
          required: ["title", "genre", "duration"],
          properties: {
            title: { type: "string", example: "Gehenu Lamai" },
            genre: { type: "string", example: "Drama" },
            duration: { type: "number", example: 110 },
            description: {
              type: "string",
              example: "A restored Sri Lankan classic drama.",
            },
            language: { type: "string", example: "Sinhala" },
            rating: { type: "string", example: "PG" },
            releaseDate: {
              type: "string",
              format: "date-time",
              example: "2026-05-01T00:00:00.000Z",
            },
          },
        },
        MovieListResponse: {
          type: "object",
          properties: {
            count: { type: "number", example: 2 },
            movies: {
              type: "array",
              items: { $ref: "#/components/schemas/Movie" },
            },
          },
        },
        MovieCreateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Movie created successfully" },
            movie: { $ref: "#/components/schemas/Movie" },
          },
        },
        MovieDeleteResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Movie deleted successfully" },
            movie: { $ref: "#/components/schemas/Movie" },
          },
        },
        Hall: {
          type: "object",
          properties: {
            hallName: { type: "string", example: "Lotus Hall" },
            totalSeats: { type: "number", example: 180 },
            seatType: {
              type: "string",
              enum: ["Standard", "VIP", "Recliner"],
              example: "Recliner",
            },
          },
        },
        Cinema: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789111" },
            cinemaName: { type: "string", example: "Liberty by Scope" },
            location: { type: "string", example: "Colombo 03" },
            halls: {
              type: "array",
              items: { $ref: "#/components/schemas/Hall" },
            },
            showtimes: {
              type: "array",
              items: {
                oneOf: [
                  { type: "string", example: "660123abc123def456789222" },
                  { $ref: "#/components/schemas/Showtime" },
                ],
              },
            },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateCinemaRequest: {
          type: "object",
          required: ["cinemaName", "location"],
          properties: {
            cinemaName: { type: "string", example: "Liberty by Scope" },
            location: { type: "string", example: "Colombo 03" },
            halls: {
              type: "array",
              items: { $ref: "#/components/schemas/Hall" },
            },
          },
        },
        CinemaListResponse: {
          type: "object",
          properties: {
            count: { type: "number", example: 1 },
            cinemas: {
              type: "array",
              items: { $ref: "#/components/schemas/Cinema" },
            },
          },
        },
        CinemaCreateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Cinema created successfully" },
            cinema: { $ref: "#/components/schemas/Cinema" },
          },
        },
        CinemaDeleteResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Cinema deleted successfully" },
            cinema: { $ref: "#/components/schemas/Cinema" },
          },
        },
        Showtime: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789222" },
            movieId: { type: "string", example: "660123abc123def456789012" },
            movieTitle: { type: "string", example: "Gehenu Lamai" },
            cinemaId: {
              oneOf: [
                { type: "string", example: "660123abc123def456789111" },
                {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "660123abc123def456789111",
                    },
                    cinemaName: { type: "string", example: "Liberty by Scope" },
                    location: { type: "string", example: "Colombo 03" },
                  },
                },
              ],
            },
            hallName: { type: "string", example: "Lotus Hall" },
            showDate: { type: "string", example: "2026-05-10" },
            showTime: { type: "string", example: "19:15" },
            ticketPrice: { type: "number", example: 1800 },
            availableSeats: { type: "number", example: 120 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateShowtimeRequest: {
          type: "object",
          required: [
            "movieId",
            "cinemaId",
            "hallName",
            "showDate",
            "showTime",
            "ticketPrice",
            "availableSeats",
          ],
          properties: {
            movieId: { type: "string", example: "660123abc123def456789012" },
            movieTitle: { type: "string", example: "Gehenu Lamai" },
            cinemaId: { type: "string", example: "660123abc123def456789111" },
            hallName: { type: "string", example: "Lotus Hall" },
            showDate: { type: "string", example: "2026-05-10" },
            showTime: { type: "string", example: "19:15" },
            ticketPrice: { type: "number", example: 1800 },
            availableSeats: { type: "number", example: 120 },
          },
        },
        ShowtimeListResponse: {
          type: "object",
          properties: {
            count: { type: "number", example: 1 },
            shows: {
              type: "array",
              items: { $ref: "#/components/schemas/Showtime" },
            },
          },
        },
        ShowtimeCreateResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Showtime created successfully",
            },
            show: { $ref: "#/components/schemas/Showtime" },
          },
        },
        Booking: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789333" },
            userId: { type: "string", example: "660123abc123def456789444" },
            showId: { type: "string", example: "660123abc123def456789222" },
            movieTitle: { type: "string", example: "Gehenu Lamai" },
            cinemaName: { type: "string", example: "Liberty by Scope" },
            showDate: { type: "string", example: "2026-05-10" },
            showTime: { type: "string", example: "19:15" },
            seats: {
              type: "array",
              items: { type: "string", example: "B4" },
            },
            totalAmount: { type: "number", example: 3600 },
            status: {
              type: "string",
              enum: ["CONFIRMED", "CANCELLED"],
              example: "CONFIRMED",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateBookingRequest: {
          type: "object",
          required: ["showId", "seats"],
          properties: {
            showId: { type: "string", example: "660123abc123def456789222" },
            movieTitle: { type: "string", example: "Gehenu Lamai" },
            cinemaName: { type: "string", example: "Liberty by Scope" },
            showDate: { type: "string", example: "2026-05-10" },
            showTime: { type: "string", example: "19:15" },
            seats: {
              type: "array",
              items: { type: "string", example: "B4" },
            },
            totalAmount: { type: "number", example: 3600 },
          },
        },
        BookingListResponse: {
          type: "object",
          properties: {
            count: { type: "number", example: 1 },
            bookings: {
              type: "array",
              items: { $ref: "#/components/schemas/Booking" },
            },
          },
        },
        BookingCreateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Booking confirmed" },
            booking: { $ref: "#/components/schemas/Booking" },
          },
        },
        BookingCancelResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Booking cancelled successfully",
            },
            booking: { $ref: "#/components/schemas/Booking" },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789444" },
            name: { type: "string", example: "Nadeesha Perera" },
            email: { type: "string", example: "nadeesha.perera@example.com" },
            phone: { type: "string", example: "0772345678" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        UserListResponse: {
          type: "object",
          properties: {
            count: { type: "number", example: 2 },
            users: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
            },
          },
        },
        RegisterUserRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Nadeesha Perera" },
            email: { type: "string", example: "nadeesha.perera@example.com" },
            password: { type: "string", example: "SecurePass123" },
            phone: { type: "string", example: "0772345678" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "nadeesha.perera@example.com" },
            password: { type: "string", example: "SecurePass123" },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Nadeesha Perera" },
            email: { type: "string", example: "nadeesha.perera@example.com" },
            phone: { type: "string", example: "0772345678" },
            password: { type: "string", example: "NewSecurePass123" },
            role: { type: "string", enum: ["user", "admin"], example: "admin" },
          },
        },
        UpdateOwnProfileRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Nadeesha Perera" },
            email: { type: "string", example: "nadeesha.perera@example.com" },
            phone: { type: "string", example: "0772345678" },
            password: { type: "string", example: "NewSecurePass123" },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User registered successfully",
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        UserUpdateResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User profile updated successfully",
            },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Server error" },
            details: { type: "string", example: "Additional error details" },
            service: { type: "string", example: "http://localhost:3001" },
          },
        },
      },
    },
  },
  apis: ["./index.js", "./routesDocs.js"],
};

module.exports = swaggerJSDoc(options);
