const mongoose = require("mongoose");

const CustomOrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String },
  designName: { type: String, required: true },
  material: { type: String, required: true },
  notes: String,
  file: String,
  isSeen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

CustomOrderSchema.index({ isSeen: 1 });
CustomOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("CustomOrder", CustomOrderSchema);
