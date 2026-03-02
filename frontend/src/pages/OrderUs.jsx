// src/pages/OrderUs.jsx
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import API_BASE_URL from "../config";
import "./OrderUs.css";
import { FaUser, FaPhoneAlt, FaFileUpload, FaPalette, FaStickyNote, FaCheckCircle, FaStar } from "react-icons/fa";

const EMPTY_FORM = {
  fullName: "",
  contactNumber: "",
  email: "",
  designName: "",
  file: null,
  material: "",
  notes: ""
};

export default function OrderUs() {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prefillImageName, setPrefillImageName] = useState(null); // shows fetched image name

  /* ── Autofill from Buy Now ── */
  useEffect(() => {
    const prefill = location.state?.prefill;
    if (!prefill) return;

    setForm(f => ({
      ...f,
      designName: prefill.designName || f.designName,
      material: prefill.material || f.material,
      notes: prefill.notes || f.notes,
    }));

    // Fetch image URL and convert to File for the file input
    if (prefill.imageUrl) {
      (async () => {
        try {
          const res = await fetch(prefill.imageUrl);
          const blob = await res.blob();
          const ext = blob.type.split("/")[1] || "jpg";
          const fileName = `${(prefill.designName || "product").replace(/\s+/g, "-")}.${ext}`;
          const file = new File([blob], fileName, { type: blob.type });

          // Set File in state
          setForm(f => ({ ...f, file }));
          setPrefillImageName(fileName);

          // Inject into the real <input type="file"> via DataTransfer
          if (fileInputRef.current) {
            const dt = new DataTransfer();
            dt.items.add(file);
            fileInputRef.current.files = dt.files;
          }
        } catch (err) {
          console.warn("Could not prefill image:", err);
        }
      })();
    }
  }, [location.state]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
    if (e.target.name === "file") setPrefillImageName(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));

    try {
      await fetch(`${API_BASE_URL}/api/custom-order`, { method: "POST", body: data });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm(EMPTY_FORM);
      setPrefillImageName(null);
      e.target.reset();
    } catch (error) {
      console.error("Error submitting order", error);
    }
    setLoading(false);
  };


  return (
    <div className="orderus-page">
      <Helmet>
        <title>Order Custom Wood Carving | Dream Design Carving</title>
        <meta name="description" content="Place a custom wood carving order with Dream Design Carving Services. Share your design ideas and get a personalized quote within 24 hours." />
        <meta property="og:title" content="Order Custom Wood Carving | Dream Design Carving" />
        <meta property="og:description" content="Share your design ideas and get a personalized quote within 24 hours." />
        <link rel="canonical" href="https://dream-design-carving-bnmp.vercel.app/order" />
      </Helmet>

      {/* ── Page Header ── */}
      <div className="orderus-header">
        <span className="orderus-tag">Custom Project</span>
        <h1 className="orderus-title">Start Your Custom Project</h1>
        <p className="orderus-desc">
          Share your vision with our master craftsmen. We'll review your request
          and provide a personalised quote within 24 hours.
        </p>
      </div>

      {/* ── Form ── */}
      <form className="orderus-form" onSubmit={handleSubmit} autoComplete="off">

        {/* — Personal Info — */}
        <p className="orderus-section-label">Personal Information</p>
        <div className="orderus-fields">
          <div className="orderus-group">
            <label htmlFor="fullName"><FaUser /> Full Name</label>
            <input
              name="fullName"
              id="fullName"
              type="text"
              placeholder="e.g. Abhishek Sharma"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="orderus-group">
            <label htmlFor="contactNumber"><FaPhoneAlt /> Phone Number</label>
            <input
              name="contactNumber"
              id="contactNumber"
              type="tel"
              placeholder="+91 98XXXXXXXX"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="orderus-group full-width">
            <label htmlFor="email">✉ Email Address <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional — for confirmation)</span></label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="orderus-divider" />

        {/* — Project Details — */}
        <p className="orderus-section-label">Project Details</p>
        <div className="orderus-fields-single">
          <div className="orderus-group">
            <label htmlFor="designName"><FaStar /> Project Title</label>
            <input
              name="designName"
              id="designName"
              type="text"
              placeholder="e.g. Living Room CNC Wall Panel"
              value={form.designName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="orderus-fields">
          <div className="orderus-group">
            <label htmlFor="material"><FaPalette /> Preferred Material</label>
            <select
              name="material"
              id="material"
              value={form.material}
              onChange={handleChange}
              required
            >
              <option value="">— Select Material —</option>
              <option value="Wood - Teak">Wood — Teak</option>
              <option value="Wood - Sissoo">Wood — Sissoo</option>
              <option value="MDF">MDF</option>
              <option value="PVC/WPC">PVC / WPC</option>
              <option value="Acrylic">Acrylic</option>
              <option value="Stone/Granite">Stone / Granite</option>
              <option value="Corian">Corian (Solid Surface)</option>
              <option value="Other">Other / Not Sure</option>
            </select>
          </div>
          <div className="orderus-group">
            <label htmlFor="file"><FaFileUpload /> Reference Image</label>
            <input
              ref={fileInputRef}
              name="file"
              id="file"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              required
            />
            {prefillImageName && (
              <span className="orderus-prefill-badge">
                ✓ Auto-filled: {prefillImageName}
              </span>
            )}
          </div>
        </div>

        <div className="orderus-divider" />

        {/* — Additional Notes — */}
        <p className="orderus-section-label">Additional Details</p>
        <div className="orderus-fields-single">
          <div className="orderus-group">
            <label htmlFor="notes"><FaStickyNote /> Describe Your Vision</label>
            <textarea
              name="notes"
              id="notes"
              placeholder="Describe dimensions, finish, style, or any specific requirements..."
              value={form.notes}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>

        <button className="orderus-submit" type="submit" disabled={loading}>
          {loading ? 'Submitting…' : <><FaCheckCircle /> Request a Quote</>}
        </button>

        {submitted && (
          <div className="orderus-success">
            <FaCheckCircle /> Request received! We will contact you within 24 hours.
          </div>
        )}
      </form>

      {/* ── Info Strip ── */}
      <div className="orderus-info-strip">
        <div className="orderus-info-item">
          <span className="orderus-info-label">Response Time</span>
          <span className="orderus-info-value">Within 24 Hours</span>
        </div>
        <div className="orderus-info-item">
          <span className="orderus-info-label">Craftsmanship</span>
          <span className="orderus-info-value">100% Hand & CNC Crafted</span>
        </div>
        <div className="orderus-info-item">
          <span className="orderus-info-label">Customisation</span>
          <span className="orderus-info-value">Fully Bespoke Designs</span>
        </div>
      </div>
    </div>
  );
}
