// src/pages/OrderUs.jsx
import React, { useState } from "react";
import "./OrderUs.css";
import { FaUser, FaPhoneAlt, FaFileUpload, FaPalette, FaStickyNote, FaCheckCircle, FaStar } from "react-icons/fa";

export default function OrderUs() {
  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    designName: "",
    file: null,
    material: "",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));

    try {
      await fetch("/api/custom-order", { method: "POST", body: data });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({
        fullName: "",
        contactNumber: "",
        designName: "",
        file: null,
        material: "",
        notes: ""
      });
      e.target.reset();
    } catch (error) {
      console.error("Error submitting order", error);
    }
    setLoading(false);
  };

  return (
    <div className="orderus-page">
      <form className="orderus-form" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="orderus-title">Start Your Custom Project</h1>
        <p className="orderus-desc">
          Share your ideas with our master craftsmen. We'll review your request and provide a personalized quote within 24 hours.
        </p>

        <div className="orderus-fields">
          <div className="orderus-group">
            <label htmlFor="fullName"><FaUser /> Full Name</label>
            <input
              name="fullName"
              id="fullName"
              type="text"
              placeholder="e.g. John Sharma"
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
              placeholder="+977 98XXXXXXXX"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="orderus-group full-width">
          <label htmlFor="designName"><FaStar /> Project Title</label>
          <input
            name="designName"
            id="designName"
            type="text"
            placeholder="e.g. Living Room Wall Panel"
            value={form.designName}
            onChange={handleChange}
            required
          />
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
              <option value="">-- Select Material --</option>
              <option value="Wood - Teak">Wood - Teak</option>
              <option value="Wood - Sissoo">Wood - Sissoo</option>
              <option value="MDF">MDF</option>
              <option value="PVC/WPC">PVC/WPC</option>
              <option value="Acrylic">Acrylic</option>
              <option value="Stone/Granite">Stone/Granite</option>
              <option value="Corian">Corian (Solid Surface)</option>
              <option value="Other">Other / Not Sure</option>
            </select>
          </div>

          <div className="orderus-group">
            <label htmlFor="file"><FaFileUpload /> Reference Image</label>
            <input
              name="file"
              id="file"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="orderus-group full-width">
          <label htmlFor="notes"><FaStickyNote /> Additional Details</label>
          <textarea
            name="notes"
            id="notes"
            placeholder="Describe your vision, dimensions, or specific requirements..."
            value={form.notes}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <button className="orderus-submit" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : <><FaCheckCircle /> Request Quote</>}
        </button>

        {submitted && (
          <div className="orderus-success">
            <FaCheckCircle /> Request received! We will contact you shortly.
          </div>
        )}
      </form>
    </div>
  );
}
