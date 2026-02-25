const CustomOrder = require("../models/CustomOrder");
exports.createOrder = async (req, res) => {
  try {
    const { fullName, contactNumber, designName, material, notes } = req.body;

    // Basic validation
    if (!fullName || !contactNumber || !designName || !material) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // Cloudinary returns file URL as req.file.path
    const file = req.file ? req.file.path : null;
    const order = new CustomOrder({
      fullName,
      contactNumber,
      designName,
      material,
      notes,
      file
    });

    await order.save();
    res.status(201).json({ message: "Order received successfully" });
  } catch (error) {
    console.error("Custom Order Error:", error.message);
    res.status(500).json({ message: "Failed to submit order. Please try again." });
  }
};
