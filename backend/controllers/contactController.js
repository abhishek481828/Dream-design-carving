const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendContactMail = async (req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, Phone, and Message are required.' });
  }

  try {
    // Save to Database
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    const transporter = createTransporter();

    // Notify business owner
    await transporter.sendMail({
      from: `"Dream Design Carving" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <table style="font-family:Arial;font-size:14px;">
          <tr><td><b>Name:</b></td><td>${name}</td></tr>
          <tr><td><b>Phone:</b></td><td>${phone}</td></tr>
          <tr><td><b>Email:</b></td><td>${email || 'Not provided'}</td></tr>
          <tr><td><b>Message:</b></td><td>${message}</td></tr>
        </table>
      `
    }).catch(err => console.error("Admin notification email failed:", err.message));

    // Send confirmation to customer (if email provided)
    if (email) {
      await transporter.sendMail({
        from: `"Dream Design Carving" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `✅ We received your message — Dream Design Carving`,
        html: `
          <h2>Thank you, ${name}!</h2>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p><b>Your message:</b> ${message}</p>
          <br/>
          <p>Best regards,<br/>Dream Design Carving Services Pvt. Ltd.<br/>📞 +977 9840028822</p>
        `
      }).catch(err => console.error("Customer confirmation email failed:", err.message));
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
