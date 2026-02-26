import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaPalette, FaRegStickyNote, FaCalendarAlt, FaBoxOpen, FaCheckCircle, FaEye } from "react-icons/fa";
import AdminNav from "../components/AdminNav";
import API_BASE_URL from "../config";
import { adminFetch } from "../utils/adminFetch";

import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImg, setModalImg] = useState(null);
  const token = localStorage.getItem("adminToken");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/orders-admin`);
      if (!res) return; // 401 - redirecting
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to fetch orders");
      }
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const pagedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const markAsSeen = async (id) => {
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/admin/mark-seen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "order", id })
      });
      if (res && res.ok) {
        setOrders(orders.map(o => o._id === id ? { ...o, isSeen: true } : o));
      }
    } catch (error) {
      console.error("Failed to mark as seen", error);
    }
  };

  return (
    <div className="admin-orders-container">
      <AdminNav />
      <div className="orders-header">
        <div>
          <h2>Orders</h2>
          <div className="orders-header-sub">DDC // ADMIN PANEL</div>
        </div>
        <div style={{ color: '#6a6a70', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          {orders.length} TOTAL
        </div>
      </div>

      {loading && <div className="loading-state">Loading orders...</div>}
      {error && <div className="error-state">{error}</div>}

      {!loading && !error && (
        orders.length === 0 ? (
          <div className="empty-state">No orders found.</div>
        ) : (
          <>
          {modalImg && (
            <div className="order-img-modal" onClick={() => setModalImg(null)}>
              <img src={modalImg} alt="Full Preview" className="order-img-modal-img" />
              <button className="order-img-modal-close" onClick={e => { e.stopPropagation(); setModalImg(null); }}>×</button>
            </div>
          )}
          <div className="orders-grid">
            {pagedOrders.map(order => (
              <div key={order._id} className={`order-card ${order.isSeen ? 'seen' : 'unseen'}`}>
                {!order.isSeen && <div className="unseen-badge">New</div>}
                <div className="order-image-container">
                  {order.file ? (
                    <img
                      src={order.file}
                      alt="Customer Design"
                      className="order-image"
                      onClick={() => setModalImg(order.file)}
                      style={{ cursor: 'zoom-in' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <FaBoxOpen />
                    </div>
                  )}
                </div>
                <div className="order-details">
                  <OrderDetail icon={<FaUser />} label="Name" value={order.fullName} />
                  <OrderDetail icon={<FaPhoneAlt />} label="Contact" value={order.contactNumber} />
                  <OrderDetail icon={<FaPalette />} label="Design" value={order.designName} />
                  <OrderDetail icon={<FaBoxOpen />} label="Material" value={order.material} />
                  <OrderDetail icon={<FaRegStickyNote />} label="Notes" value={order.notes} />
                  <OrderDetail icon={<FaCalendarAlt />} label="Date" value={order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"} />

                  {!order.isSeen && (
                    <button
                      className="mark-seen-btn"
                      onClick={() => markAsSeen(order._id)}
                      title="Mark as Seen"
                    >
                      <FaCheckCircle /> Mark as Seen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '1.5rem 0' }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ padding: '6px 20px', borderRadius: '4px', border: '1px solid #2d2d30', background: 'transparent', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#3a3a40' : '#e2e2e7', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>PREV</button>
              <span style={{ color: '#6a6a70', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>PAGE {currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ padding: '6px 20px', borderRadius: '4px', border: '1px solid #2d2d30', background: 'transparent', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#3a3a40' : '#e2e2e7', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>NEXT</button>
            </div>
          )}
          </>
        )
      )}
    </div>
  );
}

// Helper component for order details
function OrderDetail({ icon, label, value }) {
  return (
    <div className="order-detail-item">
      <span className="detail-icon">{icon}</span>
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{value || "-"}</span>
    </div>
  );
}
