// ── Movie Model ───────────────────────────────────────────────
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Animation", "Romance", "Thriller"],
    },
    duration: {
      type: Number,
      required: [true, "Duration (minutes) is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
      type: String,
      default: "English",
    },
    rating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "U"],
      default: "PG",
    },
    releaseDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
