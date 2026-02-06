const express = require("express");
const CustomOrder = require("../models/CustomOrder");
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  const orders = await CustomOrder.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
