const express = require("express");
const { createOrder } = require("../controllers/customOrderController");
const { uploadOrder } = require("../middleware/uploadMiddleware");

const router = express.Router();

// POST /api/custom-order (with optional file upload to Cloudinary)
router.post("/", uploadOrder.single("file"), createOrder);

module.exports = router;
