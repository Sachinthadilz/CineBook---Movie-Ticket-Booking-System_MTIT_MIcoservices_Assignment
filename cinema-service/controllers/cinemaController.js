const mongoose = require("mongoose");
const Cinema = require("../models/Cinema");

const isValidationError = (error) => error.name === "ValidationError";
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const sendServerError = (res, error) =>
  res.status(500).json({ error: "Server error", details: error.message });

const sendInvalidCinemaId = (res) =>
  res.status(400).json({ error: "Invalid cinema ID format" });

const createCinema = async (req, res) => {
  try {
    const { cinemaName, location, halls } = req.body;

    if (!cinemaName || !location) {
      return res
        .status(400)
        .json({ error: "cinemaName and location are required" });
    }

    const cinema = await Cinema.create({
      cinemaName,
      location,
      halls: Array.isArray(halls) ? halls : [],
    });

    res.status(201).json({ message: "Cinema created successfully", cinema });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }

    sendServerError(res, error);
  }
};

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find({ isActive: true })
      .populate("showtimes")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: cinemas.length, cinemas });
  } catch (error) {
    sendServerError(res, error);
  }
};

const deleteCinema = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendInvalidCinemaId(res);
    }

    const cinema = await Cinema.findByIdAndDelete(id);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    res.status(200).json({ message: "Cinema deleted successfully", cinema });
  } catch (error) {
    sendServerError(res, error);
  }
};

const updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const { cinemaName, location, halls, isActive } = req.body;

    if (!isValidObjectId(id)) {
      return sendInvalidCinemaId(res);
    }

    const cinema = await Cinema.findById(id);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    if (cinemaName !== undefined) cinema.cinemaName = cinemaName;
    if (location !== undefined) cinema.location = location;
    if (halls !== undefined) {
      if (!Array.isArray(halls)) {
        return res.status(400).json({ error: "halls must be an array" });
      }
      cinema.halls = halls;
    }
    if (isActive !== undefined) cinema.isActive = isActive;

    const updatedCinema = await cinema.save();

    res.status(200).json({
      message: "Cinema updated successfully",
      cinema: updatedCinema,
    });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }
    sendServerError(res, error);
  }
};

module.exports = { createCinema, getAllCinemas, deleteCinema, updateCinema };
