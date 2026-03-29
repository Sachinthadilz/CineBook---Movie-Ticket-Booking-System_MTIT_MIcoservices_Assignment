const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const isValidationError = (error) => error.name === "ValidationError";

const sendServerError = (res, error) =>
  res.status(500).json({ error: "Server error", details: error.message });

const createBooking = async (req, res) => {
  try {
    const {
      userId,
      showId,
      movieTitle,
      cinemaName,
      showDate,
      showTime,
      seats,
      totalAmount,
    } = req.body;

    if (!showId || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ error: "showId and seats[] are required" });
    }

    const effectiveUserId = userId || req.user.id;

    if (effectiveUserId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        error: "You are not allowed to create a booking for another user.",
      });
    }

    const booking = await Booking.create({
      userId: effectiveUserId,
      showId,
      movieTitle: movieTitle || "",
      cinemaName: cinemaName || "",
      showDate: showDate || "",
      showTime: showTime || "",
      seats,
      totalAmount: totalAmount || 0,
      status: "CONFIRMED",
    });

    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }

    sendServerError(res, error);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ count: bookings.length, bookings });
  } catch (error) {
    sendServerError(res, error);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID format" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === "CANCELLED") {
      return res.status(400).json({ error: "Booking is already cancelled" });
    }

    if (booking.userId !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not allowed to cancel this booking." });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    sendServerError(res, error);
  }
};

module.exports = { createBooking, getAllBookings, cancelBooking };
