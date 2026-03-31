const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  cancelBooking,
  updateBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     description: Creates a confirmed booking for a user and selected seats.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       201:
 *         description: Success. Booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingCreateResponse'
 *       400:
 *         description: Validation error. Booking payload is missing required fields.
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
 *         description: Authenticated user is not allowed to create this booking.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", protect, createBooking);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Returns all bookings sorted by newest first.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success. Bookings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingListResponse'
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
 */
router.get("/", protect, getAllBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     description: Permanently deletes an existing booking using its MongoDB identifier.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the booking.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success. Booking deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingCancelResponse'
 *       400:
 *         description: Invalid booking ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Booking not found.
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
 *         description: Authenticated user is not allowed to delete this booking.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", protect, cancelBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     description: Updates an existing booking. Only the booking owner or an admin can update. Cannot update cancelled bookings.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the booking.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingRequest'
 *     responses:
 *       200:
 *         description: Success. Booking updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingUpdateResponse'
 *       400:
 *         description: Invalid booking ID format, invalid payload, or attempting to update a cancelled booking.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Booking not found.
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
 *         description: Authenticated user is not allowed to update this booking.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", protect, updateBooking);

module.exports = router;
