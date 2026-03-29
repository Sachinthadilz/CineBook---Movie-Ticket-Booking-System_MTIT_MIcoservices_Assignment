// ── Booking Model ─────────────────────────────────────────────
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    showId: {
      type: String,
      required: [true, "showId is required"],
    },
    movieTitle: {
      type: String,
      default: "",
    },
    cinemaName: {
      type: String,
      default: "",
    },
    showDate: {
      type: String,
      default: "",
    },
    showTime: {
      type: String,
      default: "",
    },
    seats: {
      type: [String], // e.g. ["A1", "A2"]
      required: [true, "seats array is required"],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one seat must be selected",
      },
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
