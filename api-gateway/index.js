require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

const movieServiceUrl =
  process.env.MOVIE_SERVICE_URL || "http://localhost:3001";
const cinemaServiceUrl =
  process.env.CINEMA_SERVICE_URL || "http://localhost:3002";
const bookingServiceUrl =
  process.env.BOOKING_SERVICE_URL || "http://localhost:3003";
const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:3004";

app.use(cors());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Gateway health check
 *     description: Returns gateway status, proxied base routes, and links to service-level Swagger UIs.
 *     tags:
 *       - Gateway
 *     responses:
 *       200:
 *         description: Success. Gateway status retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GatewayStatus'
 *       500:
 *         description: Unexpected gateway error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get("/", (req, res) => {
  res.json({
    message: "CineBook API Gateway is running",
    version: "1.0.0",
    docs: `http://localhost:${PORT}/api-docs`,
    routes: [
      { method: "POST", path: "/movies", target: movieServiceUrl },
      { method: "GET", path: "/movies", target: movieServiceUrl },
      { method: "GET", path: "/movies/:id", target: movieServiceUrl },
      { method: "DELETE", path: "/movies/:id", target: movieServiceUrl },
      { method: "POST", path: "/cinemas", target: cinemaServiceUrl },
      { method: "GET", path: "/cinemas", target: cinemaServiceUrl },
      { method: "DELETE", path: "/cinemas/:id", target: cinemaServiceUrl },
      { method: "POST", path: "/shows", target: cinemaServiceUrl },
      { method: "GET", path: "/shows", target: cinemaServiceUrl },
      { method: "POST", path: "/bookings", target: bookingServiceUrl },
      { method: "GET", path: "/bookings", target: bookingServiceUrl },
      { method: "DELETE", path: "/bookings/:id", target: bookingServiceUrl },
      { method: "POST", path: "/users/register", target: userServiceUrl },
      { method: "POST", path: "/users/login", target: userServiceUrl },
      { method: "GET", path: "/users", target: userServiceUrl },
      { method: "GET", path: "/users/me", target: userServiceUrl },
      { method: "PUT", path: "/users/me", target: userServiceUrl },
      { method: "GET", path: "/users/:id", target: userServiceUrl },
      { method: "PUT", path: "/users/:id", target: userServiceUrl },
    ],
    swaggerUrls: {
      gateway: `http://localhost:${PORT}/api-docs`,
      movie: "http://localhost:3001/api-docs",
      cinema: "http://localhost:3002/api-docs",
      booking: "http://localhost:3003/api-docs",
      user: "http://localhost:3004/api-docs",
    },
  });
});

const proxy = (target) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl,
    on: {
      error: (err, req, res) => {
        console.error(`[Gateway] Proxy error -> ${target}:`, err.message);
        res.status(502).json({ error: "Service unavailable", service: target });
      },
    },
  });

app.use("/movies", proxy(movieServiceUrl));
app.use("/cinemas", proxy(cinemaServiceUrl));
app.use("/shows", proxy(cinemaServiceUrl));
app.use("/bookings", proxy(bookingServiceUrl));
app.use("/users", proxy(userServiceUrl));

app.use((req, res) => {
  res.status(404).json({ error: "Route not found on gateway" });
});

app.listen(PORT, () => {
  console.log(`API Gateway -> http://localhost:${PORT}`);
  console.log(`Gateway Swagger -> http://localhost:${PORT}/api-docs`);
  console.log(`Movie Swagger -> http://localhost:3001/api-docs`);
  console.log(`Cinema Swagger -> http://localhost:3002/api-docs`);
  console.log(`Booking Swagger -> http://localhost:3003/api-docs`);
  console.log(`User Swagger -> http://localhost:3004/api-docs`);
});
