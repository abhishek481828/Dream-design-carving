import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./AdminLogin.css";

// ── Defined OUTSIDE AdminLogin so React doesn't remount it on every keystroke ──
const KineticShell = ({ children, title, subtitle, frameRef }) => (
  <div className="kal-page">
    <div className="kal-grid-bg" />
    <main className="kal-frame" ref={frameRef}>
      <div className="kal-shimmer" />
      <div className="kal-block-decor" />

      {/* Sidebar */}
      <aside className="kal-sidebar">
        <div className="kal-status-dot" />
        <div className="kal-side-label">DDC // ADMIN</div>
        <div className="kal-sidebar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
      </aside>

      {/* Header */}
      <header className="kal-header">
        <div>
          <h1>{title}</h1>
          <p className="kal-header-sub">{subtitle}</p>
        </div>
        <div className="kal-sys-info">
          DREAM_DESIGN_CARVING<br />
          ENCRYPTION: AES-256<br />
          <span id="kal-clock">00:00:00</span>
        </div>
      </header>

      {/* Dynamic content */}
      {children}

      {/* Footer */}
      <footer className="kal-footer">
        <div className="kal-utility-links">
          <a href="/admin/forgot-password">RECOVER_ACCESS</a>
        </div>
        <div>SYSTEM: <span className="kal-status-ok">ONLINE</span></div>
      </footer>

      <div className="kal-version-tag">DDC // ADMIN_PORTAL v1.0</div>
    </main>
  </div>
);

export default function AdminLogin({ onLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ username: "", password: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const frameRef = useRef(null);

  useEffect(() => {
    // Real-time clock
    function updateClock() {
      const el = document.getElementById("kal-clock");
      if (!el) return;
      const now = new Date();
      el.textContent =
        now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0") + ":" +
        now.getSeconds().toString().padStart(2, "0");
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);

    // Subtle parallax mouse effect
    function handleMouseMove(e) {
      if (!frameRef.current) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      frameRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(timer);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [step]);

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
        navigate("/admin/orders", { replace: true });
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  // ── Step 2: OTP verification ──
  if (step === 2) {
    return (
      <KineticShell title="Verify" subtitle="TWO-FACTOR AUTHENTICATION" frameRef={frameRef}>
        <section className="kal-content">
          <form onSubmit={handleOtpSubmit} autoComplete="off" className="kal-inner-form">
            <p className="kal-otp-info">
              A 6-digit OTP was sent to<br />
              <strong>abhishek481828@gmail.com</strong><br />
              Valid for <strong>5 minutes</strong>
            </p>

            <div className="kal-input-group">
              <div className="kal-label-wrap">
                <label>One-Time Password</label>
                <span className="kal-req-tag">REQ_OTP</span>
              </div>
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
                className="kal-input-field kal-otp-input"
              />
            </div>

            <div className="kal-action-module">
              <button
                type="submit"
                className="kal-btn-main"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "VERIFYING…" : "Confirm OTP"}
              </button>
              <button
                type="button"
                className="kal-btn-icon"
                onClick={() => { setStep(1); setOtp(""); }}
                title="Back to Login"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      </KineticShell>
    );
  }

  // ── Step 1: Username + Password ──
  return (
    <KineticShell title="Access" subtitle="SECURE ADMIN INTERFACE" frameRef={frameRef}>
      <section className="kal-content">
        <form onSubmit={handleLoginSubmit} autoComplete="off" className="kal-inner-form">
          <div className="kal-input-group">
            <div className="kal-label-wrap">
              <label>Identity / Email</label>
              <span className="kal-req-tag">REQ_01</span>
            </div>
            <input
              name="username"
              type="email"
              className="kal-input-field"
              placeholder="admin@dreamdesign.com"
              autoComplete="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="kal-input-group">
            <div className="kal-label-wrap">
              <label>Access Key / Password</label>
              <span className="kal-req-tag">REQ_02</span>
            </div>
            <input
              name="password"
              type="password"
              className="kal-input-field"
              placeholder="••••••••••••"
              autoComplete="current-password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="kal-action-module">
            <button type="submit" className="kal-btn-main" disabled={loading}>
              {loading ? "INITIALIZING…" : "Initialize Session"}
            </button>
            <div className="kal-btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
          </div>
        </form>
      </section>
    </KineticShell>
  );
}
