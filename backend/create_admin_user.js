const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("Connected to MongoDB");

    const email = "vijaykant9988@gmail.com";
    const password = "Dreamdesign09";
    const name = "Admin User";

    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log("Admin user already exists. Updating password...");
        userExists.password = password;
        userExists.role = "admin";
        await userExists.save();
        console.log("Admin password updated successfully");
        process.exit();
    }

    const user = new User({
        name,
        email,
        password,
        role: "admin"
    });

    await user.save();
    console.log("Admin user created successfully");
    console.log("Email: " + email);
    console.log("Password: " + password);
    process.exit();
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
