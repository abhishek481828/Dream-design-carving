import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { sendContactMessage } from '../services/api';
import './ContactUs.css';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

export default function ContactUs() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendContactMessage(form);
      if (res.success) {
        toast.success('Message sent! We will get back to you soon.');
        setForm(EMPTY_FORM);
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
      <Helmet>
        <title>Contact Us | Dream Design Carving Services</title>
        <meta name="description" content="Contact Dream Design Carving Services for custom wood carving orders, consultations and quotes. Located in Nepal." />
        <meta property="og:title" content="Contact Us | Dream Design Carving Services" />
        <meta property="og:description" content="Get in touch for custom wood carving orders, consultations and quotes." />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/contact" />
      </Helmet>

      <div className="contact-container">

        {/* ── Header ── */}
        <div className="contact-header">
          <span className="contact-tag">Get In Touch</span>
          <h1 className="contact-title">Let's start<br /><span>a conversation</span></h1>
          <p className="contact-subtitle">
            Have a vision for a custom carving? We're here to bring it to life.
            Reach out to us for consultations, quotes, or just to say hello.
          </p>
        </div>

        <div className="contact-content">

          {/* ── Left Side: Contact Info ── */}
          <div className="contact-info-grid">

            <div className="contact-info-card">
              <div className="info-icon-box"><FaPhoneAlt /></div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>
                  <a href="tel:+9779840028822" className="info-highlight">+977 9840028822</a>
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="info-icon-box"><FaEnvelope /></div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>
                  <a href="mailto:vijaykant9988@gmail.com" className="info-highlight">vijaykant9988@gmail.com</a>
                </p>
                <p style={{ marginTop: '0.25rem' }}>We'll respond within 24 hours.</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="info-icon-box"><FaMapMarkerAlt /></div>
              <div className="info-content">
                <h3>Visit Studio</h3>
                <p className="info-highlight">Mahalaxmi-Tikathaki, Lalitpur</p>
                <p>Nepal</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="info-icon-box"><FaClock /></div>
              <div className="info-content">
                <h3>Opening Hours</h3>
                <p className="info-success">Always Open, 24/7</p>
              </div>
            </div>

          </div>

          {/* ── Right Side: Form ── */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+977 98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com (Optional)"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your project..."
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

        {/* ── Map Section ── */}
        <div className="map-section">
          <iframe
            title="Dream Design Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2986.6821501152594!2d85.35437404739423!3d27.652947910001792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb11526b509367%3A0x532598e0c615ae69!2sDream%20Design%20Carving!5e1!3m2!1sen!2snp!4v1768920469145!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
}
