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
  try {
    const { username, password } = req.body;
    console.log("Admin Login Attempt:", username);

    const user = await User.findOne({ email: username });

    if (!user) {
      console.log("Admin Login: User not found");
      return res.status(401).json({ message: "Invalid credentials or not an admin" });
    }

    if (user.role !== "admin") {
      console.log("Admin Login: Role is not admin (Role:", user.role, ")");
      return res.status(401).json({ message: "Invalid credentials or not an admin" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Admin Login: Password incorrect");
      return res.status(401).json({ message: "Invalid credentials or not an admin" });
    }

    const secret = process.env.JWT_SECRET || "fallback_admin_secret";
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "2h" });

    console.log("Admin Login: Success");
    res.json({ token });
  } catch (err) {
    console.error("Admin Login Error:", err);
    res.status(500).json({ message: "Internal Admin Login Error" });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${frontendUrl}/admin/reset-password/${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Admin Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 30 minutes.</p>`
    });

    res.json({ message: "Reset email sent" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Failed to send reset email. Please try again later." });
  }
});

// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Failed to reset password. Please try again." });
  }
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
