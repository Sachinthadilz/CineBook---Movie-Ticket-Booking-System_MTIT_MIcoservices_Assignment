const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3002;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineBook Cinema Service API",
      version: "1.0.0",
      description:
        "API documentation for the CineBook cinema and showtime service.",
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
        Hall: {
          type: "object",
          properties: {
            hallName: { type: "string", example: "Hall 1" },
            totalSeats: { type: "number", example: 120 },
            seatType: {
              type: "string",
              enum: ["Standard", "VIP", "Recliner"],
              example: "VIP",
            },
          },
        },
        Cinema: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789012" },
            cinemaName: { type: "string", example: "Majestic Cineplex" },
            location: { type: "string", example: "Colombo 03" },
            halls: {
              type: "array",
              items: { $ref: "#/components/schemas/Hall" },
            },
            showtimes: {
              type: "array",
              items: {
                oneOf: [
                  { type: "string", example: "660123abc123def456789099" },
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
            cinemaName: { type: "string", example: "Majestic Cineplex" },
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
        UpdateCinemaRequest: {
          type: "object",
          properties: {
            cinemaName: {
              type: "string",
              example: "Majestic Cineplex Updated",
            },
            location: { type: "string", example: "Colombo 07" },
            halls: {
              type: "array",
              items: { $ref: "#/components/schemas/Hall" },
            },
            isActive: { type: "boolean", example: true },
          },
        },
        CinemaUpdateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Cinema updated successfully" },
            cinema: { $ref: "#/components/schemas/Cinema" },
          },
        },
        Showtime: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789099" },
            movieId: { type: "string", example: "660123abc123def456789011" },
            movieTitle: { type: "string", example: "Inception" },
            cinemaId: {
              oneOf: [
                { type: "string", example: "660123abc123def456789012" },
                {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "660123abc123def456789012",
                    },
                    cinemaName: {
                      type: "string",
                      example: "Majestic Cineplex",
                    },
                    location: { type: "string", example: "Colombo 03" },
                  },
                },
              ],
            },
            hallName: { type: "string", example: "Hall 1" },
            showDate: { type: "string", example: "2026-04-05" },
            showTime: { type: "string", example: "18:30" },
            ticketPrice: { type: "number", example: 2500 },
            availableSeats: { type: "number", example: 80 },
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
            movieId: { type: "string", example: "660123abc123def456789011" },
            movieTitle: { type: "string", example: "Inception" },
            cinemaId: { type: "string", example: "660123abc123def456789012" },
            hallName: { type: "string", example: "Hall 1" },
            showDate: { type: "string", example: "2026-04-05" },
            showTime: { type: "string", example: "18:30" },
            ticketPrice: { type: "number", example: 2500 },
            availableSeats: { type: "number", example: 80 },
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
        UpdateShowtimeRequest: {
          type: "object",
          properties: {
            movieId: { type: "string", example: "660123abc123def456789011" },
            movieTitle: { type: "string", example: "Inception 2" },
            cinemaId: { type: "string", example: "660123abc123def456789012" },
            hallName: { type: "string", example: "Hall 2" },
            showDate: { type: "string", example: "2026-04-10" },
            showTime: { type: "string", example: "20:00" },
            ticketPrice: { type: "number", example: 3000 },
            availableSeats: { type: "number", example: 100 },
          },
        },
        ShowtimeUpdateResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Showtime updated successfully",
            },
            show: { $ref: "#/components/schemas/Showtime" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Server error" },
            details: { type: "string", example: "Additional error details" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./index.js"],
};

module.exports = swaggerJSDoc(options);
