const mongoose = require("mongoose");
const Cinema = require("../models/Cinema");
const Showtime = require("../models/Showtime");

const isValidationError = (error) => error.name === "ValidationError";

const sendServerError = (res, error) =>
  res.status(500).json({ error: "Server error", details: error.message });

const createShow = async (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      cinemaId,
      hallName,
      showDate,
      showTime,
      ticketPrice,
      availableSeats,
    } = req.body;

    if (
      !movieId ||
      !cinemaId ||
      !hallName ||
      !showDate ||
      !showTime ||
      ticketPrice === undefined ||
      availableSeats === undefined
    ) {
      return res.status(400).json({
        error:
          "movieId, cinemaId, hallName, showDate, showTime, ticketPrice, and availableSeats are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(cinemaId)) {
      return res.status(400).json({ error: "Invalid cinemaId format" });
    }

    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    const show = await Showtime.create({
      movieId,
      movieTitle,
      cinemaId,
      hallName,
      showDate,
      showTime,
      ticketPrice,
      availableSeats,
    });

    cinema.showtimes.push(show._id);
    await cinema.save();

    const populatedShow = await Showtime.findById(show._id).populate(
      "cinemaId",
      "cinemaName location",
    );

    res
      .status(201)
      .json({ message: "Showtime created successfully", show: populatedShow });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }

    sendServerError(res, error);
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await Showtime.find()
      .populate("cinemaId", "cinemaName location")
      .sort({ showDate: 1, showTime: 1 });

    res.status(200).json({ count: shows.length, shows });
  } catch (error) {
    sendServerError(res, error);
  }
};

const updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      movieId,
      movieTitle,
      cinemaId,
      hallName,
      showDate,
      showTime,
      ticketPrice,
      availableSeats,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid showtime ID format" });
    }

    const show = await Showtime.findById(id);
    if (!show) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    if (cinemaId !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(cinemaId)) {
        return res.status(400).json({ error: "Invalid cinemaId format" });
      }
      const cinema = await Cinema.findById(cinemaId);
      if (!cinema) {
        return res.status(404).json({ error: "Cinema not found" });
      }
      show.cinemaId = cinemaId;
    }

    if (movieId !== undefined) show.movieId = movieId;
    if (movieTitle !== undefined) show.movieTitle = movieTitle;
    if (hallName !== undefined) show.hallName = hallName;
    if (showDate !== undefined) show.showDate = showDate;
    if (showTime !== undefined) show.showTime = showTime;
    if (ticketPrice !== undefined) {
      if (typeof ticketPrice !== "number" || ticketPrice < 0) {
        return res
          .status(400)
          .json({ error: "ticketPrice must be a non-negative number" });
      }
      show.ticketPrice = ticketPrice;
    }
    if (availableSeats !== undefined) {
      if (typeof availableSeats !== "number" || availableSeats < 0) {
        return res
          .status(400)
          .json({ error: "availableSeats must be a non-negative number" });
      }
      show.availableSeats = availableSeats;
    }

    const updatedShow = await show.save();

    const populatedShow = await Showtime.findById(updatedShow._id).populate(
      "cinemaId",
      "cinemaName location",
    );

    res.status(200).json({
      message: "Showtime updated successfully",
      show: populatedShow,
    });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }
    sendServerError(res, error);
  }
};

module.exports = { createShow, getAllShows, updateShow };
