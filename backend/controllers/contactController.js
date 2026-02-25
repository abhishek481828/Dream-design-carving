const { Resend } = require('resend');
const Contact = require('../models/Contact');

exports.sendContactMail = async (req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, Phone, and Message are required.' });
  }

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ success: true, message: 'Message sent successfully!' });

    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: 'Dream Design Carving <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'vijaykant9988@gmail.com',
      subject: 'New Contact Message from ' + name,
      html: '<h2>New Contact Message</h2><table style="font-family:Arial;font-size:14px;"><tr><td><b>Name:</b></td><td>' + name + '</td></tr><tr><td><b>Phone:</b></td><td>' + phone + '</td></tr><tr><td><b>Email:</b></td><td>' + (email || 'Not provided') + '</td></tr><tr><td><b>Message:</b></td><td>' + message + '</td></tr></table>'
    }).catch(err => console.error('Admin notification failed:', err.message));

    if (email) {
      resend.emails.send({
        from: 'Dream Design Carving <onboarding@resend.dev>',
        to: email,
        subject: 'We received your message - Dream Design Carving',
        html: '<h2>Thank you, ' + name + '!</h2><p>We have received your message and will get back to you within 24 hours.</p><p><b>Your message:</b> ' + message + '</p><br/><p>Best regards,<br/>Dream Design Carving Services Pvt. Ltd.<br/>+977 9840028822</p>'
      }).catch(err => console.error('Customer confirmation failed:', err.message));
    }

  } catch (error) {
    console.error('Contact Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to send message.' });
    }
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};