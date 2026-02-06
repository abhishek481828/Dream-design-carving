import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaPalette, FaRegStickyNote, FaCalendarAlt, FaBoxOpen, FaCheckCircle, FaEye } from "react-icons/fa";
import AdminNav from "../components/AdminNav";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("adminToken");

  const fetchOrders = () => {
    setLoading(true);
    setError("");
    fetch("/api/orders-admin", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to fetch orders");
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const markAsSeen = async (id) => {
    try {
      const res = await fetch("/api/admin/mark-seen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type: "order", id })
      });
      if (res.ok) {
        setOrders(orders.map(o => o._id === id ? { ...o, isSeen: true } : o));
      }
    } catch (error) {
      console.error("Failed to mark as seen", error);
    }
  };

  return (
    <div className="admin-orders-container">
      <div className="orders-header">
        <div>
          <h2>Admin Dashboard</h2>
          <AdminNav />
        </div>
        <div style={{ color: '#64748b', fontWeight: '500' }}>
          {orders.length} Orders
        </div>
      </div>

      {loading && <div className="loading-state">Loading orders...</div>}
      {error && <div className="error-state">{error}</div>}

      {!loading && !error && (
        orders.length === 0 ? (
          <div className="empty-state">No orders found.</div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order._id} className={`order-card ${order.isSeen ? 'seen' : 'unseen'}`}>
                {!order.isSeen && <div className="unseen-badge">New</div>}
                <div className="order-image-container">
                  {order.file ? (
                    <img
                      src={`${BACKEND_URL}/uploads/${order.file}`}
                      alt="Customer Design"
                      className="order-image"
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
