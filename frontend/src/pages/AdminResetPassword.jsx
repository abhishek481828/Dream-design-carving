import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";

export default function AdminResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setMsg(""); setError("");
    const res = await fetch(`${API_BASE_URL}/api/admin/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok) setMsg(data.message);
    else setError(data.message || "Error");
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          name="password"
          type="password"
          placeholder="New password (min 8 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={8}
          required
        />
        <button type="submit">Reset Password</button>
        {msg && <div className="admin-login-success">{msg}</div>}
        {error && <div className="admin-login-error">{error}</div>}
      </form>
    </div>
  );
}
