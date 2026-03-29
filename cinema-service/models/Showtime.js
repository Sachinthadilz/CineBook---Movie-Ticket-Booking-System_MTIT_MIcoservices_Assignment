// ── Showtime Model ────────────────────────────────────────────
const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: [true, "movieId is required"],
    },
    movieTitle: {
      type: String,
      default: "",
    },
    cinemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
      required: [true, "cinemaId is required"],
    },
    hallName: {
      type: String,
      required: [true, "Hall name is required"],
    },
    showDate: {
      type: String,
      required: [true, "Show date is required"], // e.g. "2026-04-05"
    },
    showTime: {
      type: String,
      required: [true, "Show time is required"], // e.g. "18:30"
    },
    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: 0,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Showtime", showtimeSchema);
