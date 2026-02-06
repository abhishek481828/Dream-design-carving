import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './ContactUs.css';
import { sendContactMessage } from '../services/api';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendContactMessage(form);
      if (res.success) {
        toast.success('Message sent! We will get back to you soon.');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(res.error || 'Failed to send message.');
      }
    } catch {
      toast.error('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have a vision for a custom carving? We're here to bring it to life. Reach out to us for consultations, quotes, or just to say hello ☺️😊.
          </p>
        </div>

        <div className="contact-content">
          {/* Left Side: Contact Info */}
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon-box"><FaPhoneAlt /></div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p><a href="tel:+9779840028822" style={{ fontSize: '1rem', fontWeight: 'bold', textDecoration: 'underline', color: '#60a5fa' }}>+977 9840028822</a></p>

              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-box"><FaEnvelope /></div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p><a href="mailto:cncdreamdesign@outlook.com" style={{ fontSize: '1rem', fontWeight: 'bold', textDecoration: 'underline', color: '#60a5fa' }}>cncdreamdesign@outlook.com</a></p>
                <p>We'll respond within 24 hours.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-box"><FaMapMarkerAlt /></div>
              <div className="info-content">
                <h3>Visit Studio</h3>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', textDecoration: 'underline', color: '#60a5fa' }}>Mahalaxmi-Tikathaki, Lalitpur<br />Nepal</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-box"><FaClock /></div>
              <div className="info-content">
                <h3>Opening Hours</h3>
                <p style={{ color: '#4ade80', fontWeight: 'bold' }}>Always Open, 24/7 hours</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  className="form-input"
                  placeholder="+977 98XXXXXXXX (Required)"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com (Optional)"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section Placeholder */}
        <div className="map-section">
          <iframe
            title="Dream Design Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2986.6821501152594!2d85.35437404739423!3d27.652947910001792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb11526b509367%3A0x532598e0c615ae69!2sDream%20Design%20Carving!5e1!3m2!1sen!2snp!4v1768920469145!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
