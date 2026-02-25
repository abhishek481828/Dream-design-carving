require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

/**
 * Resets the admin account to default credentials.
 * Run with: node recreateAdmin.js
 *
 * Admin credentials after reset:
 *   Email:    admin@dreamdesign.com
 *   Password: Admin@123
 */
const recreateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        // 1. Delete existing admin(s)
        await User.deleteMany({ role: "admin" });
        console.log("Existing admin(s) deleted.");

        // 2. Create new admin with known credentials
        const admin = new User({
            name: "Admin User",
            email: "admin@dreamdesign.com",
            password: "Admin@123",
            role: "admin",
        });

        await admin.save();
        console.log("===================================================");
        console.log("Admin account recreated:");
        console.log("  Email:    admin@dreamdesign.com");
        console.log("  Password: Admin@123");
        console.log("IMPORTANT: Change the default password after login!");
        console.log("===================================================");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

recreateAdmin();
