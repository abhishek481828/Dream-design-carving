import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-creative">
      <div className="footer-content">

        {/* Brand Column */}
        <div className="footer-brand">
          <h2>Dream Design Carving</h2>
          <p className="footer-tagline">
            Blending timeless artistry with modern precision. We transform simple materials into architectural masterpieces.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/profile.php?id=100063705754024&__tn__=%2Cd" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/dream_design_carving_pvt_ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/9779840028822" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/designs">Our Designs</Link></li>
            <li><Link to="/order">Custom Order</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3>Our Expertise</h3>
          <ul className="footer-links">
            <li><Link to="/designs">CNC Carving</Link></li>
            <li><Link to="/designs">Wooden Doors</Link></li>
            <li><Link to="/designs">Wall Panels</Link></li>
            <li><Link to="/designs">Decorative Jalis</Link></li>
            <li><Link to="/admin/login">Admin Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div className="contact-text">
              Mahalaxmi-Tikathaki<br />Lalitpur, Nepal
            </div>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <div className="contact-text">
              <a href="tel:+9779840028822">+977 9840028822</a>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div className="contact-text">
              <a href="mailto:vijaykant9988@gmail.com">vijaykant9988@gmail.com</a>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Dream Design Carving Services Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
