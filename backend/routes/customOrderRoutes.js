const express = require("express");
const multer = require("multer");
const path = require("path");
const CustomOrder = require("../models/CustomOrder");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// POST /api/custom (with file upload)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { fullName, contactNumber, designName, material, notes } = req.body;
    const file = req.file ? req.file.filename : null;

    const order = new CustomOrder({
      fullName,
      contactNumber,
      designName,
      material,
      notes,
      file
    });
    await order.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order could not be saved." });
  }
});

module.exports = router;
