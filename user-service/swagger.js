const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3004;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineBook User Service API",
      version: "1.0.0",
      description: "API documentation for the CineBook user service.",
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
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789078" },
            name: { type: "string", example: "Sachi Perera" },
            email: { type: "string", example: "sachi@example.com" },
            phone: { type: "string", example: "+94771234567" },
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
            name: { type: "string", example: "Sachi Perera" },
            email: { type: "string", example: "sachi@example.com" },
            password: { type: "string", example: "secret123" },
            phone: { type: "string", example: "+94771234567" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "sachi@example.com" },
            password: { type: "string", example: "secret123" },
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
        UserResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "User registered successfully" },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        UserUpdateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "User profile updated successfully" },
            user: { $ref: "#/components/schemas/User" },
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
