const express = require("express");
const router = express.Router();
const { createShow, getAllShows } = require("../controllers/showtimeController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /shows:
 *   post:
 *     summary: Create a showtime
 *     description: Creates a new showtime for a movie in a cinema hall.
 *     tags:
 *       - Showtimes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateShowtimeRequest'
 *     responses:
 *       201:
 *         description: Success. Showtime created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShowtimeCreateResponse'
 *       400:
 *         description: Validation error. Showtime payload or cinema ID is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Related cinema was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required or token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Authenticated user is not allowed to create showtimes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", protect, authorizeRoles("admin"), createShow);

/**
 * @swagger
 * /shows:
 *   get:
 *     summary: Get all showtimes
 *     description: Returns all showtimes sorted by show date.
 *     tags:
 *       - Showtimes
 *     responses:
 *       200:
 *         description: Success. Showtimes retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShowtimeListResponse'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllShows);

module.exports = router;
