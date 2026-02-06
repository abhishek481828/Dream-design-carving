const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },

  image: {
    type: String,
    required: [true, "Please add an image URL"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: ['doors', 'furniture', 'sculptures', 'panels', 'custom'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
