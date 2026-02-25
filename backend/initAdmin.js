const User = require("./models/User");

/**
 * Ensures at least one admin user exists in the database.
 * If no admin is found, a default admin is created with the credentials below.
 *
 * Default credentials:
 *   Email:    admin@dreamdesign.com
 *   Password: Admin@123
 *
 * IMPORTANT: Change the default password after first login.
 */
const initAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@dreamdesign.com",
        password: "Admin@123",
        role: "admin",
      });
      console.log("===================================================");
      console.log("Default admin account created:");
      console.log("  Email:    admin@dreamdesign.com");
      console.log("  Password: Admin@123");
      console.log("IMPORTANT: Change the default password after login!");
      console.log("===================================================");
    }
  } catch (err) {
    console.error("Admin initialization error:", err.message);
  }
};

module.exports = initAdmin;
