const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    isSeen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
