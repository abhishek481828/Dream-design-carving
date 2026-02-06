import React, { useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { FaCheckCircle } from "react-icons/fa";
import AdminNav from "../components/AdminNav";
import API_BASE_URL from "../config";
import "./AdminProducts.css"; // Reuse existing styles

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("adminToken");

    const fetchMessages = () => {
        setLoading(true);
        fetch(`${API_BASE_URL}/api/contact`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async res => {
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.message || "Failed to fetch messages");
                }
                return res.json();
            })
            .then(data => {
                setMessages(Array.isArray(data) ? data : []);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMessages();
    }, [token]);

    const markAsSeen = async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/mark-seen`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ type: "message", id })
            });
            if (res.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, isSeen: true } : m));
            }
        } catch (error) {
            console.error("Failed to mark as seen", error);
        }
    };

    return (
        <div className="admin-products-container">
            <div className="admin-header">
                <div>
                    <h2>Admin Dashboard</h2>
                    <AdminNav />
                </div>
            </div>

            <div className="product-list" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#334155' }}>Customer Inquiries</h3>

                {loading && <div style={{ textAlign: 'center', color: '#64748b' }}>Loading messages...</div>}

                {error && <div style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>}

                {!loading && !error && messages.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                        No messages received yet.
                    </div>
                )}

                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {messages.map(msg => (
                        <div key={msg._id} style={{
                            background: msg.isSeen ? "#f8fafc" : "#eff6ff",
                            padding: "1.5rem",
                            borderRadius: "12px",
                            border: msg.isSeen ? "1px solid #e2e8f0" : "2px solid #3b82f6",
                            transition: "all 0.2s",
                            position: 'relative'
                        }}>
                            {!msg.isSeen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: '#3b82f6',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                }}>New</div>
                            )}
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        background: '#bfdbfe', color: '#1d4ed8',
                                        borderRadius: '50%', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold', fontSize: '1.2rem'
                                    }}>
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, color: "#0f172a" }}>{msg.name}</h4>
                                        <a href={`mailto:${msg.email}`} style={{ color: "#3b82f6", textDecoration: 'none', fontSize: '0.9rem' }}>
                                            {msg.email}
                                        </a>
                                    </div>
                                </div>
                                <span style={{ color: "#64748b", fontSize: "0.85rem", background: "white", padding: "4px 12px", borderRadius: "20px", border: "1px solid #cbd5e1" }}>
                                    {new Date(msg.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", color: "#334155", lineHeight: "1.6", marginBottom: '1rem' }}>
                                {msg.message}
                            </div>
                            {!msg.isSeen && (
                                <button
                                    onClick={() => markAsSeen(msg._id)}
                                    style={{
                                        background: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 15px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <FaCheckCircle /> Mark as Seen
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
