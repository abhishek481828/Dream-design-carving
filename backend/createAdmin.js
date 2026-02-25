require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const ADMIN_EMAIL = "admin@dreamdesign.com";
const ADMIN_PASSWORD = "Admin@1234";
const ADMIN_NAME = "Admin User";

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    let admin = await User.findOne({ email: ADMIN_EMAIL });
    if (admin) {
      // Reset password for existing admin
      admin.password = ADMIN_PASSWORD;
      await admin.save();
      console.log("Admin password reset successfully!");
    } else {
      admin = new User({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
      await admin.save();
      console.log("Admin created successfully!");
    }

    console.log("--- Admin Credentials ---");
    console.log("Email:   ", ADMIN_EMAIL);
    console.log("Password:", ADMIN_PASSWORD);

    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
