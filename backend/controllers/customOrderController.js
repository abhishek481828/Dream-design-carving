const CustomOrder = require("../models/CustomOrder");
const { Resend } = require('resend');

exports.createOrder = async (req, res) => {
  try {
    const { fullName, contactNumber, email, designName, material, notes } = req.body;

    if (!fullName || !contactNumber || !designName || !material) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const file = req.file ? req.file.path : null;
    const order = new CustomOrder({ fullName, contactNumber, email, designName, material, notes, file });
    await order.save();

    res.status(201).json({ message: "Order received successfully" });

    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: 'Dream Design Carving <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'vijaykant9988@gmail.com', 'abhishek481828@gmail.com'],
      subject: 'New Custom Order from ' + fullName,
      html: '<h2>New Custom Order Received</h2><table style="font-family:Arial;font-size:14px;"><tr><td><b>Full Name:</b></td><td>' + fullName + '</td></tr><tr><td><b>Contact:</b></td><td>' + contactNumber + '</td></tr><tr><td><b>Email:</b></td><td>' + (email || 'Not provided') + '</td></tr><tr><td><b>Design Name:</b></td><td>' + designName + '</td></tr><tr><td><b>Material:</b></td><td>' + material + '</td></tr><tr><td><b>Notes:</b></td><td>' + (notes || 'None') + '</td></tr>' + (file ? '<tr><td><b>Attachment:</b></td><td><a href="' + file + '">View File</a></td></tr>' : '') + '</table>'
    }).catch(err => console.error('Admin order notification failed:', err.message));

  } catch (error) {
    console.error("Custom Order Error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to submit order. Please try again." });
    }
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};