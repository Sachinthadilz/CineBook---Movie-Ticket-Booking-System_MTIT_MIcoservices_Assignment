const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3003;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineBook Booking Service API",
      version: "1.0.0",
      description: "API documentation for the CineBook booking service.",
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
        Booking: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789045" },
            userId: { type: "string", example: "660123abc123def456789078" },
            showId: { type: "string", example: "660123abc123def456789099" },
            movieTitle: { type: "string", example: "Inception" },
            cinemaName: { type: "string", example: "Majestic Cineplex" },
            showDate: { type: "string", example: "2026-04-05" },
            showTime: { type: "string", example: "18:30" },
            seats: {
              type: "array",
              items: { type: "string", example: "A1" },
            },
            totalAmount: { type: "number", example: 5000 },
            status: { type: "string", enum: ["CONFIRMED", "CANCELLED"], example: "CONFIRMED" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateBookingRequest: {
          type: "object",
          required: ["userId", "showId", "seats"],
          properties: {
            userId: { type: "string", example: "660123abc123def456789078" },
            showId: { type: "string", example: "660123abc123def456789099" },
            movieTitle: { type: "string", example: "Inception" },
            cinemaName: { type: "string", example: "Majestic Cineplex" },
            showDate: { type: "string", example: "2026-04-05" },
            showTime: { type: "string", example: "18:30" },
            seats: {
              type: "array",
              items: { type: "string", example: "A1" },
              minItems: 1,
            },
            totalAmount: { type: "number", example: 5000 },
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
            message: { type: "string", example: "Booking cancelled successfully" },
            booking: { $ref: "#/components/schemas/Booking" },
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
