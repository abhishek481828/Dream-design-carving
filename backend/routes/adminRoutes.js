const express = require("express");
const User = require("../models/User");
const crypto = require("crypto");
const { Resend } = require('resend');
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { protect, admin } = require("../middleware/auth");
const Contact = require("../models/Contact");
const Order = require("../models/Order");
const CustomOrder = require("../models/CustomOrder");
const router = express.Router();

// Strict rate limiter for login — 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// OTP rate limiter — 10 attempts per 15 minutes
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many OTP attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Step 1: Verify credentials → send OTP
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Invalid credentials or not an admin" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials or not an admin" });
    }

    // Generate 6-digit OTP — use updateOne to bypass pre-save hooks
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await User.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } });

    // Send OTP via Resend
    // NOTE: Resend free tier (onboarding@resend.dev sender) can only deliver
    // to the account owner's verified email: abhishek481828@gmail.com
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: 'Dream Design Carving <onboarding@resend.dev>',
      to: ['abhishek481828@gmail.com'],
      subject: 'Admin Login OTP - Dream Design Carving',
      html: `<h2>Your Admin Login OTP</h2><p>Use this OTP to complete your login. It is valid for <b>5 minutes</b>.</p><h1 style="letter-spacing:8px;color:#3b82f6;font-size:2.5rem">${otp}</h1><p>If you did not request this, ignore this email.</p>`
    });

    if (emailError) {
      console.error("Resend OTP email error:", emailError);
      // Clear OTP so user doesn't get stuck
      await User.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpiry: "" } });
      return res.status(500).json({ message: "Failed to send OTP email. Please try again." });
    }

    res.json({ otpSent: true, message: "OTP sent to your registered email." });
  } catch (err) {
    console.error("Admin Login Error:", err.message);
    res.status(500).json({ message: "Internal Admin Login Error" });
  }
});

// Step 2: Verify OTP → issue JWT
router.post("/verify-otp", otpLimiter, async (req, res) => {
  try {
    const { username, otp } = req.body;

    const user = await User.findOne({ email: username });
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Invalid request" });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "No OTP requested. Please login again." });
    }

    if (new Date() > user.otpExpiry) {
      await User.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpiry: "" } });
      return res.status(400).json({ message: "OTP has expired. Please login again." });
    }

    if (user.otp !== otp.trim()) {
      return res.status(400).json({ message: "Incorrect OTP. Please try again." });
    }

    // Clear OTP after successful use
    await User.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpiry: "" } });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "Server configuration error" });

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error("OTP Verify Error:", err.message);
    res.status(500).json({ message: "OTP verification failed" });
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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${frontendUrl}/admin/reset-password/${token}`;

    await resend.emails.send({
      from: 'Dream Design Carving <onboarding@resend.dev>',
      to: user.email,
      subject: 'Admin Password Reset',
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
