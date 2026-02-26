import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API_BASE_URL from "../config";
import "./AdminNav.css";

const AdminNav = () => {
    const location = useLocation();
    const [counts, setCounts] = useState({ unreadOrders: 0, unreadMessages: 0 });
    const token = localStorage.getItem("adminToken");

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    };

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/admin/unread-counts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCounts(data);
                }
            } catch (error) {
                console.error("Failed to fetch unread counts", error);
            }
        };
        fetchCounts();
        const interval = setInterval(fetchCounts, 30000);
        return () => clearInterval(interval);
    }, [token]);

    const navItems = [
        { to: "/admin/products", label: "PRODUCTS", meta: "001", badge: 0 },
        { to: "/admin/orders",   label: "ORDERS",   meta: "002", badge: counts.unreadOrders },
        { to: "/admin/messages", label: "MESSAGES", meta: "003", badge: counts.unreadMessages },
    ];

    return (
        <nav className="adm-rail">
            <div className="adm-rail-header">
                <span className="adm-rail-subtitle">DDC // ADMIN</span>
            </div>

            <div className="adm-nav-group">
                {navItems.map(item => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`adm-btn${location.pathname === item.to ? " adm-btn--active" : ""}`}
                    >
                        <span className="adm-btn-label">{item.label}</span>
                        {item.badge > 0
                            ? <span className="adm-badge">{item.badge}</span>
                            : <span className="adm-meta">{item.meta}</span>
                        }
                    </Link>
                ))}
            </div>

            <div className="adm-logout-section">
                <button className="adm-btn adm-btn--logout" onClick={handleLogout}>
                    <span className="adm-btn-label">LOGOUT</span>
                    <span className="adm-meta">EXIT_SES</span>
                </button>
            </div>
        </nav>
    );
};

export default AdminNav;
