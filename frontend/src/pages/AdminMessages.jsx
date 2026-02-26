import React, { useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { FaCheckCircle } from "react-icons/fa";
import AdminNav from "../components/AdminNav";
import API_BASE_URL from "../config";
import { adminFetch } from "../utils/adminFetch";
import "./AdminProducts.css"; // Reuse existing styles

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem("adminToken");

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await adminFetch(`${API_BASE_URL}/api/contact`);
            if (!res) return; // 401 - redirecting
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Failed to fetch messages");
            }
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [token]);

    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.ceil(messages.length / ITEMS_PER_PAGE);
    const pagedMessages = messages.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const markAsSeen = async (id) => {
        try {
            const res = await adminFetch(`${API_BASE_URL}/api/admin/mark-seen`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "message", id })
            });
            if (res && res.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, isSeen: true } : m));
            }
        } catch (error) {
            console.error("Failed to mark as seen", error);
        }
    };

    return (
        <div className="admin-products-container">
            <AdminNav />
            <div className="admin-header">
                <div>
                    <h2>Messages</h2>
                    <div className="admin-header-sub">DDC // ADMIN PANEL</div>
                </div>
            </div>

            <div className="product-list" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#e2e2e7', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em', fontSize: '0.85rem', textTransform: 'uppercase' }}>Customer Inquiries</h3>

                {loading && <div style={{ textAlign: 'center', color: '#6a6a70' }}>Loading messages...</div>}

                {error && <div style={{ color: '#ff3e3e', textAlign: 'center' }}>{error}</div>}

                {!loading && !error && messages.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#6a6a70', padding: '2rem' }}>
                        No messages received yet.
                    </div>
                )}

                <div style={{ display: "grid", gap: "1px", border: '1px solid #1a1a1e', background: '#1a1a1e' }}>
                    {pagedMessages.map(msg => (
                        <div key={msg._id} style={{
                            background: '#0e0e10',
                            padding: "1.5rem 1.75rem",
                            border: 'none',
                            transition: "background 0.15s"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem", alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '36px', height: '36px',
                                        background: '#1a1a1e', color: '#6a6a70',
                                        borderRadius: '50%', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold', fontSize: '1rem',
                                        border: '1px solid #2d2d30',
                                        fontFamily: "'JetBrains Mono', monospace"
                                    }}>
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, color: '#e2e2e7', fontWeight: 700, fontSize: '0.95rem' }}>{msg.name}</h4>
                                        <a href={`mailto:${msg.email}`} style={{ color: '#6a6a70', textDecoration: 'none', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>
                                            {msg.email}
                                        </a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                    {!msg.isSeen && (
                                        <span style={{
                                            color: '#ffffff',
                                            background: 'rgba(220, 60, 60, 0.75)',
                                            fontSize: '0.62rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            padding: '2px 7px',
                                            borderRadius: '2px'
                                        }}>NEW</span>
                                    )}
                                    <span style={{ color: '#3a3a45', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div style={{ background: '#080809', padding: '1rem 1.25rem', border: '1px solid #18181c', color: '#c4c4cc', lineHeight: '1.7', marginBottom: '1rem', fontSize: '0.92rem' }}>
                                {msg.message}
                            </div>
                            {!msg.isSeen && (
                                <button
                                    onClick={() => markAsSeen(msg._id)}
                                    style={{
                                        background: 'transparent',
                                        color: '#c4c4cc',
                                        border: '1px solid #3a3a45',
                                        padding: '5px 16px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <FaCheckCircle /> Mark as Seen
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '1.5rem 0' }}>
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #2d2d30', background: '#121214', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#6a6a70' : '#e2e2e7', opacity: currentPage === 1 ? 0.5 : 1 }}>Prev</button>
                        <span style={{ color: '#6a6a70', fontSize: '0.85rem' }}>Page {currentPage} of {totalPages} &mdash; {messages.length} total</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #2d2d30', background: '#121214', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#6a6a70' : '#e2e2e7', opacity: currentPage === totalPages ? 0.5 : 1 }}>Next</button>
                    </div>
                )}
            </div>
        </div>
    );
}
