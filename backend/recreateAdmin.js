require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const recreateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        // 1. Delete existing admin
        await User.deleteOne({ email: "admin@example.com" });
        console.log("Old admin deleted.");

        // 2. Create new admin
        const admin = new User({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456", // Explicit simple password
            role: "admin",
        });

        await admin.save();
        console.log("New admin created with password: 123456");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

recreateAdmin();
