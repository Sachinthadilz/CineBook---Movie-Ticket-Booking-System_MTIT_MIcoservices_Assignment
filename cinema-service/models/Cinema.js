const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    hallName: {
      type: String,
      required: [true, "Hall name is required"],
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: [true, "Total seats is required"],
      min: [1, "Total seats must be at least 1"],
    },
    seatType: {
      type: String,
      enum: ["Standard", "VIP", "Recliner"],
      default: "Standard",
    },
  },
  { _id: false }
);

const cinemaSchema = new mongoose.Schema(
  {
    cinemaName: {
      type: String,
      required: [true, "Cinema name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    halls: {
      type: [hallSchema],
      default: [],
    },
    showtimes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cinema", cinemaSchema);
