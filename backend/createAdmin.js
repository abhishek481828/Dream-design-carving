require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    // 1. Connect to Database
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    // 2. Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit();
    }

    // 3. Create Admin
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: "adminpassword123", // You can change this later
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully!");
    console.log("Email: admin@example.com");
    console.log("Password: adminpassword123");

    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
