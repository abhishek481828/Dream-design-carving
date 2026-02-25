const CustomOrder = require("../models/CustomOrder");
const nodemailer = require("nodemailer");

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.createOrder = async (req, res) => {
  try {
    const { fullName, contactNumber, email, designName, material, notes } = req.body;

    // Basic validation
    if (!fullName || !contactNumber || !designName || !material) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // Cloudinary returns file URL as req.file.path
    const file = req.file ? req.file.path : null;
    const order = new CustomOrder({
      fullName,
      contactNumber,
      email,
      designName,
      material,
      notes,
      file
    });

    await order.save();

    const transporter = createTransporter();

    // Notify business owner
    await transporter.sendMail({
      from: `"Dream Design Carving" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `🛒 New Custom Order from ${fullName}`,
      html: `
        <h2>New Custom Order Received</h2>
        <table style="font-family:Arial;font-size:14px;">
          <tr><td><b>Full Name:</b></td><td>${fullName}</td></tr>
          <tr><td><b>Contact:</b></td><td>${contactNumber}</td></tr>
          <tr><td><b>Email:</b></td><td>${email || 'Not provided'}</td></tr>
          <tr><td><b>Design Name:</b></td><td>${designName}</td></tr>
          <tr><td><b>Material:</b></td><td>${material}</td></tr>
          <tr><td><b>Notes:</b></td><td>${notes || 'None'}</td></tr>
          ${file ? `<tr><td><b>Attachment:</b></td><td><a href="${file}">View File</a></td></tr>` : ''}
        </table>
      `
    }).catch(err => console.error("Admin order notification failed:", err.message));

    // Send confirmation to customer (if email provided)
    if (email) {
      await transporter.sendMail({
        from: `"Dream Design Carving" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `✅ Your Custom Order is Received — Dream Design Carving`,
        html: `
          <h2>Thank you, ${fullName}!</h2>
          <p>We have received your custom order request and our team will contact you within 24 hours.</p>
          <h3>Order Summary:</h3>
          <table style="font-family:Arial;font-size:14px;">
            <tr><td><b>Design Name:</b></td><td>${designName}</td></tr>
            <tr><td><b>Material:</b></td><td>${material}</td></tr>
            <tr><td><b>Notes:</b></td><td>${notes || 'None'}</td></tr>
          </table>
          <br/>
          <p>Best regards,<br/>Dream Design Carving Services Pvt. Ltd.<br/>📞 +977 9840028822</p>
        `
      }).catch(err => console.error("Customer order confirmation failed:", err.message));
    }

    res.status(201).json({ message: "Order received successfully" });
  } catch (error) {
    console.error("Custom Order Error:", error.message);
    res.status(500).json({ message: "Failed to submit order. Please try again." });
  }
};
