const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const isValidationError = (error) => error.name === "ValidationError";

const sendServerError = (res, error) =>
  res.status(500).json({ error: "Server error", details: error.message });

const createMovie = async (req, res) => {
  try {
    const {
      title,
      genre,
      duration,
      description,
      language,
      rating,
      releaseDate,
    } = req.body;

    if (!title || !genre || duration === undefined) {
      return res
        .status(400)
        .json({ error: "title, genre, and duration are required" });
    }

    const movie = await Movie.create({
      title,
      genre,
      duration,
      description,
      language,
      rating,
      releaseDate,
    });

    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }

    sendServerError(res, error);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ count: movies.length, movies });
  } catch (error) {
    sendServerError(res, error);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid movie ID format" });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    sendServerError(res, error);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid movie ID format" });
    }

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully", movie });
  } catch (error) {
    sendServerError(res, error);
  }
};

module.exports = { createMovie, getAllMovies, getMovieById, deleteMovie };
