const express = require("express");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { protect, admin } = require("../middleware/auth");
const Contact = require("../models/Contact");
const Order = require("../models/Order");
const CustomOrder = require("../models/CustomOrder");
const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Check email or username. User model uses email, but admin frontend might send username as email or we should support both if User model has username?
  // User model has 'name' and 'email'. Admin login usually uses email.
  // Existing Admin model had 'username'. I will assume frontend sends 'username' but it might be an email.

  // Let's assume username field in request body maps to email in User model for now, or check if User has username field.
  // User model: name, email.

  const user = await User.findOne({ email: username }); // Assuming username is email

  if (!user || user.role !== "admin" || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials or not an admin" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
  await user.save();

  // Configure your SMTP (use your real credentials)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const resetLink = `${process.env.FRONTEND_URL}/admin/reset-password/${token}`;
  await transporter.sendMail({
    to: user.email,
    subject: "Admin Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 30 minutes.</p>`
  });

  res.json({ message: "Reset email sent" });
});

// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });
  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password; // Will be hashed by pre-save hook
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

// @desc    Get unread counts for orders and messages
// @route   GET /api/admin/unread-counts
// @access  Private/Admin
router.get("/unread-counts", protect, admin, async (req, res) => {
  try {
    const unreadOrdersCount = await CustomOrder.countDocuments({ isSeen: false });
    const unreadMessagesCount = await Contact.countDocuments({ isSeen: false });

    res.json({
      unreadOrders: unreadOrdersCount,
      unreadMessages: unreadMessagesCount
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get unread counts" });
  }
});

// @desc    Mark an order or message as seen
// @route   POST /api/admin/mark-seen
// @access  Private/Admin
router.post("/mark-seen", protect, admin, async (req, res) => {
  const { type, id } = req.body;

  try {
    if (type === "order") {
      await CustomOrder.findByIdAndUpdate(id, { isSeen: true });
    } else if (type === "message") {
      await Contact.findByIdAndUpdate(id, { isSeen: true });
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    res.json({ success: true, message: `${type} marked as seen` });
  } catch (error) {
    res.status(500).json({ message: `Failed to mark ${type} as seen` });
  }
});

module.exports = router;
