import React, { useState } from "react";
import API_BASE_URL from "../config";
import "./AdminLogin.css";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setMessage(data.message || "Reset link sent! Check your email.");
      else setError(data.message || "Failed to send reset link.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1rem' }}>Enter your admin email to receive a reset link.</p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your admin email"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <div style={{ color: '#16a34a', background: '#f0fdf4', padding: '10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>{message}</div>}
        {error && <div style={{ color: '#dc2626', background: '#fef2f2', padding: '10px', borderRadius: '6px', border: '1px solid #fecaca' }}>{error}</div>}
        <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <a href="/admin/login" style={{ color: '#3a7bd5', textDecoration: 'underline', fontSize: '0.9rem' }}>Back to Login</a>
        </p>
      </form>
    </div>
  );
}
