const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineBook Movie Service API",
      version: "1.0.0",
      description: "API documentation for the CineBook movie service.",
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
        Movie: {
          type: "object",
          properties: {
            _id: { type: "string", example: "660123abc123def456789012" },
            title: { type: "string", example: "Inception" },
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
              example: "Sci-Fi",
            },
            duration: { type: "number", example: 148 },
            description: {
              type: "string",
              example: "A mind-bending science fiction thriller.",
            },
            language: { type: "string", example: "English" },
            rating: {
              type: "string",
              enum: ["G", "PG", "PG-13", "R", "U"],
              example: "PG-13",
            },
            releaseDate: {
              type: "string",
              format: "date-time",
              example: "2010-07-16T00:00:00.000Z",
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
            title: { type: "string", example: "Inception" },
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
              example: "Sci-Fi",
            },
            duration: { type: "number", example: 148 },
            description: {
              type: "string",
              example: "A mind-bending science fiction thriller.",
            },
            language: { type: "string", example: "English" },
            rating: {
              type: "string",
              enum: ["G", "PG", "PG-13", "R", "U"],
              example: "PG-13",
            },
            releaseDate: {
              type: "string",
              format: "date-time",
              example: "2010-07-16T00:00:00.000Z",
            },
          },
        },
        MovieListResponse: {
          type: "object",
          properties: {
            count: { type: "number", example: 1 },
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
        UpdateMovieRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Inception 2" },
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
              example: "Sci-Fi",
            },
            duration: { type: "number", example: 160 },
            description: {
              type: "string",
              example: "A mind-bending sequel to the original.",
            },
            language: { type: "string", example: "English" },
            rating: {
              type: "string",
              enum: ["G", "PG", "PG-13", "R", "U"],
              example: "PG-13",
            },
            releaseDate: {
              type: "string",
              format: "date-time",
              example: "2027-07-16T00:00:00.000Z",
            },
            isActive: { type: "boolean", example: true },
          },
        },
        MovieUpdateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Movie updated successfully" },
            movie: { $ref: "#/components/schemas/Movie" },
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
