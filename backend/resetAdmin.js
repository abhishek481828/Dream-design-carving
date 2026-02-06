require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const resetPass = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        const user = await User.findOne({ email: "admin@example.com" });
        if (!user) {
            console.log("User not found!");
            process.exit();
        }

        user.password = "123456"; // Simple password
        await user.save(); // Triggers hashing

        console.log("Password reset to: 123456");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetPass();
