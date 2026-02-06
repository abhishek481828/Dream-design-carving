const CustomOrder = require("../models/CustomOrder");
exports.createOrder = async (req, res) => {
  const { fullName, contactNumber, designName, material, notes } = req.body;
  const file = req.file ? req.file.filename : null;
  const order = new CustomOrder({
    fullName,
    contactNumber,
    designName,
    material,
    notes,
    file
  });
  await order.save();
  res.json({ message: "Order received" });
};
