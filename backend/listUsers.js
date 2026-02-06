require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const listUsers = async () => {
    try {
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected! Fetching users...");

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- ${u.email} (Role: ${u.role})`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listUsers();
