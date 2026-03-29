const express = require("express");
const router = express.Router();
const { createCinema, getAllCinemas } = require("../controllers/cinemaController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /cinemas:
 *   post:
 *     summary: Create a cinema
 *     description: Creates a cinema with optional hall definitions.
 *     tags:
 *       - Cinemas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCinemaRequest'
 *     responses:
 *       201:
 *         description: Success. Cinema created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaCreateResponse'
 *       400:
 *         description: Validation error. Required cinema fields are missing or invalid.
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
 *         description: Authenticated user is not allowed to create cinemas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", protect, authorizeRoles("admin"), createCinema);

/**
 * @swagger
 * /cinemas:
 *   get:
 *     summary: Get all cinemas
 *     description: Returns all active cinemas sorted by newest first.
 *     tags:
 *       - Cinemas
 *     responses:
 *       200:
 *         description: Success. Cinemas retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaListResponse'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllCinemas);

module.exports = router;
