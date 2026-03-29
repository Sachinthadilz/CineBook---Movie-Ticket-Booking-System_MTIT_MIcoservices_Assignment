require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    service: "Booking Service",
    status: "running",
    port: PORT,
    docs: `http://localhost:${PORT}/api-docs`,
  });
});

app.use("/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error("[Booking Service Error]", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

app.listen(PORT, () => {
  console.log(`Booking Service -> http://localhost:${PORT}`);
  console.log(`Booking Swagger -> http://localhost:${PORT}/api-docs`);
});
