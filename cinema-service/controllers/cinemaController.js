const Cinema = require("../models/Cinema");

const createCinema = async (req, res) => {
  try {
    const { cinemaName, location, halls } = req.body;

    if (!cinemaName || !location) {
      return res.status(400).json({ error: "cinemaName and location are required" });
    }

    const cinema = await Cinema.create({
      cinemaName,
      location,
      halls: Array.isArray(halls) ? halls : [],
    });

    res.status(201).json({ message: "Cinema created successfully", cinema });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find({ isActive: true })
      .populate("showtimes")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: cinemas.length, cinemas });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { createCinema, getAllCinemas };
