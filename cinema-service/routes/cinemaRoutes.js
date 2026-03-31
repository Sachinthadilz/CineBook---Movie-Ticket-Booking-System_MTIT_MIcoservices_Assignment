const express = require("express");
const router = express.Router();
const {
  createCinema,
  getAllCinemas,
  deleteCinema,
  updateCinema,
} = require("../controllers/cinemaController");
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

/**
 * @swagger
 * /cinemas/{id}:
 *   delete:
 *     summary: Delete a cinema
 *     description: Permanently deletes a cinema from the database. Admin access only. Requires a bearer token in the Authorization header.
 *     tags:
 *       - Cinemas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the cinema.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success. Cinema deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaDeleteResponse'
 *       400:
 *         description: Invalid cinema ID format.
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
 *         description: Authenticated user is not allowed to delete cinemas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cinema not found.
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
 */
router.delete("/:id", protect, authorizeRoles("admin"), deleteCinema);

/**
 * @swagger
 * /cinemas/{id}:
 *   put:
 *     summary: Update a cinema
 *     description: Updates an existing cinema record. Admin access only. Requires a bearer token in the Authorization header.
 *     tags:
 *       - Cinemas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the cinema to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCinemaRequest'
 *     responses:
 *       200:
 *         description: Success. Cinema updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaUpdateResponse'
 *       400:
 *         description: Invalid cinema ID format or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cinema not found.
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
 *         description: Authenticated user is not allowed to update cinemas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", protect, authorizeRoles("admin"), updateCinema);

module.exports = router;
