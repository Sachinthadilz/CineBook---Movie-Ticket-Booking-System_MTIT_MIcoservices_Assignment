const mongoose = require("mongoose");
const Booking = require("../models/Booking");

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

    if (!userId || !showId || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ error: "userId, showId, and seats[] are required" });
    }

    if (req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "You are not allowed to create a booking for another user." });
    }

    const booking = await Booking.create({
      userId,
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
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
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
      return res.status(403).json({ error: "You are not allowed to cancel this booking." });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { createBooking, getAllBookings, cancelBooking };
