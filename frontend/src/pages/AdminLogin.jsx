import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ username: "", password: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.otpSent) {
        toast.success("OTP sent! Check your email.");
        setStep(2);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  const handleOtpSubmit = async e => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Please enter the 6-digit OTP."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, otp })
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Welcome back!");
        onLogin();
        navigate("/admin/orders");
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  const Brand = () => (
    <div className="admin-login-brand">
      <div className="admin-login-lock">🔐</div>
      <h2>Dream Design Carving</h2>
      <p className="admin-login-subtitle">Admin Portal</p>
    </div>
  );

  if (step === 2) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-form" onSubmit={handleOtpSubmit} autoComplete="off">
          <Brand />
          <div className="admin-login-divider" />
          <p className="admin-login-otp-info">
            A 6-digit OTP was sent to<br />
            <strong>abhishek481828@gmail.com</strong><br />
            Valid for <strong>5 minutes</strong>.
          </p>
          <div className="admin-login-field">
            <label>One-Time Password</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="_ _ _ _ _ _"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              autoComplete="one-time-code"
              required
              style={{ letterSpacing: "10px", fontSize: "1.6rem", textAlign: "center" }}
            />
          </div>
          <button type="submit" disabled={loading || otp.length !== 6}>
            {loading ? "Verifying…" : "Verify OTP"}
          </button>
          <button type="button" className="admin-login-back-btn" onClick={() => { setStep(1); setOtp(""); }}>
            ← Back to Login
          </button>
          <p className="admin-login-footer">Dream Design Carving © {new Date().getFullYear()}</p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleLoginSubmit} autoComplete="off">
        <Brand />
        <div className="admin-login-divider" />
        <div className="admin-login-field">
          <label>Email Address</label>
          <input
            name="username"
            type="email"
            placeholder="admin@example.com"
            autoComplete="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-login-field">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ textAlign: "right", marginTop: "-4px" }}>
          <a href="/admin/forgot-password">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP…" : "Continue →"}
        </button>
        <p className="admin-login-footer">Dream Design Carving © {new Date().getFullYear()}</p>
      </form>
    </div>
  );
}

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // Step 1: verify credentials → request OTP
  const handleLoginSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.otpSent) {
        toast.success("OTP sent! Check your email.");
        setStep(2);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  // Step 2: submit OTP → receive JWT
  const handleOtpSubmit = async e => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, otp })
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login Successful!");
        onLogin();
        navigate("/admin/orders");
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtp("");
  };

  // --- Step 2: OTP screen ---
  if (step === 2) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-form" onSubmit={handleOtpSubmit} autoComplete="off">
          <h2>Enter OTP</h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary, #555)", margin: "0 0 1rem" }}>
            A 6-digit OTP was sent to <strong>abhishek481828@gmail.com</strong>.<br />
            It expires in <strong>5 minutes</strong>.
          </p>
          <input
            name="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            autoComplete="one-time-code"
            required
            style={{ letterSpacing: "6px", fontSize: "1.4rem", textAlign: "center" }}
          />
          <button type="submit" disabled={loading || otp.length !== 6}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            type="button"
            onClick={handleBack}
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "1px solid #ccc",
              color: "inherit",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "0.55rem",
              fontSize: "0.95rem"
            }}
          >
            ← Back to Login
          </button>
        </form>
      </div>
    );
  }

  // --- Step 1: Credentials screen ---
  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleLoginSubmit} autoComplete="off">
        <h2>Admin Login</h2>
        <input
          name="username"
          placeholder="Email"
          autoComplete="username"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={handleChange}
          required
        />
        <p style={{ textAlign: "right", margin: 0 }}>
          <a
            href="/admin/forgot-password"
            style={{
              color: "#3a7bd5",
              textDecoration: "underline",
              fontSize: "0.97rem"
            }}
          >
            Forgot password?
          </a>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
