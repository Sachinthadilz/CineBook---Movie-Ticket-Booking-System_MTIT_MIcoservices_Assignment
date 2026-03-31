const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const isValidationError = (error) => error.name === "ValidationError";
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const sendServerError = (res, error) =>
  res.status(500).json({ error: "Server error", details: error.message });

const sendInvalidBookingId = (res) =>
  res.status(400).json({ error: "Invalid booking ID format" });

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

    if (!isValidObjectId(id)) {
      return sendInvalidBookingId(res);
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.userId !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this booking." });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    sendServerError(res, error);
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { seats, totalAmount, status } = req.body;

    if (!isValidObjectId(id)) {
      return sendInvalidBookingId(res);
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.userId !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not allowed to update this booking." });
    }

    if (booking.status === "CANCELLED") {
      return res
        .status(400)
        .json({ error: "Cannot update a cancelled booking." });
    }

    if (seats !== undefined) {
      if (!Array.isArray(seats) || seats.length === 0) {
        return res
          .status(400)
          .json({ error: "seats must be a non-empty array" });
      }
      booking.seats = seats;
    }

    if (totalAmount !== undefined) {
      if (typeof totalAmount !== "number" || totalAmount < 0) {
        return res
          .status(400)
          .json({ error: "totalAmount must be a non-negative number" });
      }
      booking.totalAmount = totalAmount;
    }

    if (status !== undefined) {
      if (!["CONFIRMED", "CANCELLED"].includes(status)) {
        return res
          .status(400)
          .json({ error: "status must be CONFIRMED or CANCELLED" });
      }
      booking.status = status;
    }

    const updatedBooking = await booking.save();

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ error: error.message });
    }
    sendServerError(res, error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  cancelBooking,
  updateBooking,
};
