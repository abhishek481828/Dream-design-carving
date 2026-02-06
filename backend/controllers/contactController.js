const nodemailer = require('nodemailer');
const Contact = require('../models/Contact'); // Import Contact model

exports.sendContactMail = async (req, res) => {
  const { name, email, message, phone } = req.body;

  // Revised validation: Phone is now required, Email is optional
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, Phone, and Message are required.' });
  }

  try {
    // Save to Database
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'abhishek481828@gmail.com', // Use env var if available
        pass: process.env.SMTP_PASS || 'your-app-password-here'
      }
    });

    // Email options
    const mailOptions = {
      from: email || 'no-reply@dreamdesignCarving.com', // Fallback if no email provided
      to: 'abhishek481828@gmail.com',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nMessage: ${message}`
    };

    // Send email (optional, don't fail if email fails but DB succeeds? Or fail both?)
    // For now, let's try sending email, but if it fails, we still have it in DB.
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Constructive: We saved to DB, so we can return success but maybe warn?
      // For now, return success as DB save is the critical part requested.
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
