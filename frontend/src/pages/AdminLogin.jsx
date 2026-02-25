import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  // const [error, setError] = useState(""); // Using toast instead
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));



  const handleSubmit = async e => {
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
      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login Successful!");
        onLogin();
        navigate("/admin/orders");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit} autoComplete="off">
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
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}
