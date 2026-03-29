const mongoose = require("mongoose");
const Cinema = require("../models/Cinema");
const Showtime = require("../models/Showtime");

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
        error: "movieId, cinemaId, hallName, showDate, showTime, ticketPrice, and availableSeats are required",
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

    const populatedShow = await Showtime.findById(show._id).populate("cinemaId", "cinemaName location");

    res.status(201).json({ message: "Showtime created successfully", show: populatedShow });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await Showtime.find()
      .populate("cinemaId", "cinemaName location")
      .sort({ showDate: 1, showTime: 1 });

    res.status(200).json({ count: shows.length, shows });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { createShow, getAllShows };
