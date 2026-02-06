require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const adminRoutes = require("./routes/adminRoutes");
const orderAdminRoutes = require("./routes/orderAdminRoutes");
const productRoutes = require("./routes/productRoutes");
const customOrderRoutes = require("./routes/customOrderRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Serve uploaded files statically (do this only once)
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false })); // Secure Headers
app.use(express.json({ limit: "10kb" })); // Body limit

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp());

// Routes
const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders-admin", orderAdminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/custom-order", customOrderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
